<?php

namespace App\Services;

use App\Models\Activity;
use App\Models\Budget;
use App\Models\Event;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\Fund;
use App\Models\Leadership;
use App\Models\Member;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Pledge;
use App\Models\SmallGroup;
use App\Models\Vendor;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ArchiveService
{
    /**
     * Map of type strings to model classes.
     *
     * @var array<string, string>
     */
    protected array $typeMap = [
        'members' => Member::class,
        'events' => Event::class,
        'leadership' => Leadership::class,
        'small_groups' => SmallGroup::class,
        'offerings' => Offering::class,
        'expenses' => Expense::class,
        'budgets' => Budget::class,
        'pledges' => Pledge::class,
        'funds' => Fund::class,
        'vendors' => Vendor::class,
        'expense_categories' => ExpenseCategory::class,
        'offering_types' => OfferingType::class,
    ];

    /**
     * Get all archived items across all types.
     *
     * @return Collection<string, Collection>
     */
    public function listAllArchived(): Collection
    {
        $archived = collect();

        foreach ($this->typeMap as $type => $modelClass) {
            $items = $this->listArchivedByType($type);
            if ($items->isNotEmpty()) {
                $archived->put($type, $items);
            }
        }

        return $archived;
    }

    /**
     * Get archived items by type.
     *
     * @param string $type Model type (e.g., 'members', 'events')
     * @return Collection
     * @throws \InvalidArgumentException
     */
    public function listArchivedByType(string $type): Collection
    {
        $modelClass = $this->getModelClass($type);
        
        return $modelClass::onlyTrashed()
            ->get()
            ->map(function ($item) use ($type) {
                return [
                    'id' => $item->id,
                    'type' => $type,
                    'name' => $this->getItemName($item),
                    'deleted_at' => $item->deleted_at,
                    'deleted_by' => $this->getDeletedByUser($item),
                ];
            });
    }

    /**
     * Restore an archived item.
     *
     * @param string $type Model type
     * @param int $id Item ID
     * @return bool Success status
     * @throws \InvalidArgumentException
     * @throws \Exception
     */
    public function restore(string $type, int $id): bool
    {
        $modelClass = $this->getModelClass($type);
        
        $item = $modelClass::onlyTrashed()->find($id);
        
        if (!$item) {
            throw new \Exception("Archived item not found with ID: {$id}");
        }

        DB::beginTransaction();
        
        try {
            $restored = $item->restore();
            
            if ($restored) {
                $this->logActivity('restored', $type, $id, [
                    'item_name' => $this->getItemName($item),
                ]);
            }
            
            DB::commit();
            
            return $restored;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Permanently delete an archived item.
     *
     * @param string $type Model type
     * @param int $id Item ID
     * @return bool Success status
     * @throws \InvalidArgumentException
     * @throws \Exception
     */
    public function forceDelete(string $type, int $id): bool
    {
        $modelClass = $this->getModelClass($type);
        
        $item = $modelClass::onlyTrashed()->find($id);
        
        if (!$item) {
            throw new \Exception("Archived item not found with ID: {$id}");
        }

        DB::beginTransaction();
        
        try {
            $itemName = $this->getItemName($item);
            
            $deleted = $item->forceDelete();
            
            if ($deleted) {
                $this->logActivity('force_deleted', $type, $id, [
                    'item_name' => $itemName,
                ]);
            }
            
            DB::commit();
            
            return $deleted;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Get model class from type string.
     *
     * @param string $type Model type
     * @return string Fully qualified class name
     * @throws \InvalidArgumentException
     */
    protected function getModelClass(string $type): string
    {
        if (!isset($this->typeMap[$type])) {
            throw new \InvalidArgumentException("Invalid model type: {$type}");
        }
        
        return $this->typeMap[$type];
    }

    /**
     * Log archive-related activity.
     *
     * @param string $action Action performed (archived, restored, force_deleted)
     * @param string $type Model type
     * @param int $id Item ID
     * @param array $details Additional details
     * @return void
     */
    protected function logActivity(string $action, string $type, int $id, array $details = []): void
    {
        try {
            Activity::create([
                'user_id' => auth()->id(),
                'action' => $action,
                'entity_type' => $type,
                'entity_id' => $id,
                'description' => $this->buildActivityDescription($action, $type, $details),
                'ip_address' => request()->ip(),
                'created_at' => now(),
            ]);
        } catch (\Exception $e) {
            // Log the error but don't fail the operation
            \Log::error('Failed to log archive activity', [
                'action' => $action,
                'type' => $type,
                'id' => $id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Build activity description from action and details.
     *
     * @param string $action
     * @param string $type
     * @param array $details
     * @return string
     */
    protected function buildActivityDescription(string $action, string $type, array $details): string
    {
        $itemName = $details['item_name'] ?? ('ID ' . ($details['id'] ?? 'unknown'));
        $typeLabel = ucfirst(str_replace('_', ' ', rtrim($type, 's')));
        
        switch ($action) {
            case 'archived':
                return "Archived {$typeLabel}: {$itemName}";
            case 'restored':
                return "Restored {$typeLabel}: {$itemName}";
            case 'force_deleted':
                return "Permanently deleted {$typeLabel}: {$itemName}";
            default:
                return "Performed {$action} on {$typeLabel}: {$itemName}";
        }
    }

    /**
     * Get a human-readable name for an item.
     *
     * @param mixed $item
     * @return string
     */
    protected function getItemName($item): string
    {
        // Try common name fields
        if (isset($item->first_name) && isset($item->last_name)) {
            return "{$item->first_name} {$item->last_name}";
        }
        
        if (isset($item->name)) {
            return $item->name;
        }
        
        if (isset($item->title)) {
            return $item->title;
        }
        
        if (isset($item->description)) {
            return substr($item->description, 0, 50);
        }
        
        return "ID {$item->id}";
    }

    /**
     * Get the user who deleted an item.
     *
     * @param mixed $item
     * @return string|null
     */
    protected function getDeletedByUser($item): ?string
    {
        // Try to find the activity log entry for the archive action
        $activity = Activity::where('entity_type', get_class($item))
            ->where('entity_id', $item->id)
            ->where('action', 'archived')
            ->latest('created_at')
            ->first();
        
        if ($activity && $activity->user) {
            return $activity->user->name ?? $activity->user->email;
        }
        
        return null;
    }
}
