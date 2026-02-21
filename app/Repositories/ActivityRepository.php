<?php

namespace App\Repositories;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ActivityRepository
{
    /**
     * Get all activities with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function all(array $relations = []): Collection
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Find an activity by ID with optional eager loading.
     *
     * @param int $id
     * @param array $relations
     * @return Activity|null
     */
    public function find(int $id, array $relations = []): ?Activity
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->find($id);
    }

    /**
     * Create a new activity log entry.
     *
     * @param array $data
     * @return Activity
     */
    public function create(array $data): Activity
    {
        // Automatically set created_at if not provided
        if (!isset($data['created_at'])) {
            $data['created_at'] = now();
        }

        return Activity::create($data);
    }

    /**
     * Log an activity.
     *
     * @param int $userId
     * @param string $action
     * @param string $entityType
     * @param int|null $entityId
     * @param string $description
     * @param string|null $ipAddress
     * @return Activity
     */
    public function log(
        int $userId,
        string $action,
        string $entityType,
        ?int $entityId,
        string $description,
        ?string $ipAddress = null
    ): Activity {
        return $this->create([
            'user_id' => $userId,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'description' => $description,
            'ip_address' => $ipAddress,
        ]);
    }

    /**
     * Delete an activity record.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $activity = Activity::find($id);
        
        if (!$activity) {
            return false;
        }

        return $activity->delete();
    }

    /**
     * Get recent activities with optional limit and eager loading.
     *
     * @param int $limit
     * @param array $relations
     * @return Collection
     */
    public function getRecent(int $limit = 10, array $relations = []): Collection
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Filter activities by user.
     *
     * @param int $userId
     * @param array $relations
     * @return Collection
     */
    public function filterByUser(int $userId, array $relations = []): Collection
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Filter activities by action.
     *
     * @param string $action
     * @param array $relations
     * @return Collection
     */
    public function filterByAction(string $action, array $relations = []): Collection
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('action', $action)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Filter activities by entity type.
     *
     * @param string $entityType
     * @param array $relations
     * @return Collection
     */
    public function filterByEntityType(string $entityType, array $relations = []): Collection
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('entity_type', $entityType)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Filter activities by entity.
     *
     * @param string $entityType
     * @param int $entityId
     * @param array $relations
     * @return Collection
     */
    public function filterByEntity(string $entityType, int $entityId, array $relations = []): Collection
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('entity_type', $entityType)
            ->where('entity_id', $entityId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get activities within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @param array $relations
     * @return Collection
     */
    public function getByDateRange(string $startDate, string $endDate, array $relations = []): Collection
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereBetween('created_at', [$startDate, $endDate])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get paginated activities with optional filters and eager loading.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        // Apply user filter
        if (isset($filters['user_id']) && !empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        // Apply action filter
        if (isset($filters['action']) && !empty($filters['action'])) {
            $query->where('action', $filters['action']);
        }

        // Apply entity type filter
        if (isset($filters['entity_type']) && !empty($filters['entity_type'])) {
            $query->where('entity_type', $filters['entity_type']);
        }

        // Apply date range filter
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->whereBetween('created_at', [$filters['start_date'], $filters['end_date']]);
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    /**
     * Search activities by description.
     *
     * @param string $query
     * @param array $relations
     * @return Collection
     */
    public function search(string $query, array $relations = []): Collection
    {
        $searchQuery = Activity::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $searchQuery->where('description', 'like', "%{$query}%")
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get activities with user information (optimized query).
     *
     * @return Collection
     */
    public function getAllWithUsers(): Collection
    {
        return Activity::with('user')->orderBy('created_at', 'desc')->get();
    }

    /**
     * Get recent activities for dashboard with user information.
     *
     * @param int $limit
     * @return Collection
     */
    public function getRecentForDashboard(int $limit = 10): Collection
    {
        return Activity::with('user')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get activity count by action type.
     *
     * @param string $action
     * @return int
     */
    public function countByAction(string $action): int
    {
        return Activity::where('action', $action)->count();
    }

    /**
     * Get activity count by user.
     *
     * @param int $userId
     * @return int
     */
    public function countByUser(int $userId): int
    {
        return Activity::where('user_id', $userId)->count();
    }

    /**
     * Delete activities older than a specified date.
     *
     * @param string $date
     * @return int Number of deleted records
     */
    public function deleteOlderThan(string $date): int
    {
        return Activity::where('created_at', '<', $date)->delete();
    }
}
