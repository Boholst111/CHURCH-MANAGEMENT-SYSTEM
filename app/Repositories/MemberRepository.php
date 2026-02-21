<?php

namespace App\Repositories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class MemberRepository
{
    /**
     * Get all members with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function all(array $relations = []): Collection
    {
        $query = Member::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->get();
    }

    /**
     * Find a member by ID with optional eager loading.
     *
     * @param int $id
     * @param array $relations
     * @return Member|null
     */
    public function find(int $id, array $relations = []): ?Member
    {
        $query = Member::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->find($id);
    }

    /**
     * Create a new member.
     *
     * @param array $data
     * @return Member
     */
    public function create(array $data): Member
    {
        return Member::create($data);
    }

    /**
     * Update a member.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $member = Member::find($id);
        
        if (!$member) {
            return false;
        }

        return $member->update($data);
    }

    /**
     * Delete a member.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $member = Member::find($id);
        
        if (!$member) {
            return false;
        }

        return $member->delete();
    }

    /**
     * Search members by name, email, or phone.
     *
     * @param string $query
     * @param array $relations
     * @return Collection
     */
    public function search(string $query, array $relations = []): Collection
    {
        $searchQuery = Member::query();

        if (!empty($relations)) {
            $searchQuery->with($relations);
        }

        return $searchQuery->where(function ($q) use ($query) {
            $q->where('first_name', 'like', "%{$query}%")
              ->orWhere('last_name', 'like', "%{$query}%")
              ->orWhere('email', 'like', "%{$query}%")
              ->orWhere('phone', 'like', "%{$query}%");
        })->get();
    }

    /**
     * Filter members by status.
     *
     * @param string $status
     * @param array $relations
     * @return Collection
     */
    public function filterByStatus(string $status, array $relations = []): Collection
    {
        $query = Member::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('status', $status)->get();
    }

    /**
     * Filter members by small group.
     *
     * @param int $smallGroupId
     * @param array $relations
     * @return Collection
     */
    public function filterBySmallGroup(int $smallGroupId, array $relations = []): Collection
    {
        $query = Member::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('small_group_id', $smallGroupId)->get();
    }

    /**
     * Get paginated members with optional filters and eager loading.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = Member::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        // Apply search filter
        if (isset($filters['search']) && !empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Apply status filter
        if (isset($filters['status']) && !empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Apply small group filter
        if (isset($filters['small_group_id']) && !empty($filters['small_group_id'])) {
            $query->where('small_group_id', $filters['small_group_id']);
        }

        return $query->paginate($perPage);
    }

    /**
     * Get members count by status.
     *
     * @param string $status
     * @return int
     */
    public function countByStatus(string $status): int
    {
        return Member::where('status', $status)->count();
    }

    /**
     * Get new visitors for the current month.
     *
     * @return Collection
     */
    public function getNewVisitorsThisMonth(): Collection
    {
        return Member::where('status', 'visitor')
            ->whereMonth('date_joined', now()->month)
            ->whereYear('date_joined', now()->year)
            ->get();
    }

    /**
     * Get members with their small groups (optimized query).
     *
     * @return Collection
     */
    public function getAllWithSmallGroups(): Collection
    {
        return Member::with('smallGroup')->get();
    }

    /**
     * Get members with their tithes (optimized query).
     *
     * @return Collection
     */
    public function getAllWithTithes(): Collection
    {
        return Member::with('tithes')->get();
    }
}
