<?php

namespace App\Services;

use App\Models\Member;
use App\Repositories\MemberRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class MemberService
{
    protected MemberRepository $memberRepository;

    public function __construct(MemberRepository $memberRepository)
    {
        $this->memberRepository = $memberRepository;
    }

    /**
     * Get all members with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function getAllMembers(array $relations = []): Collection
    {
        return $this->memberRepository->all($relations);
    }

    /**
     * Get a member by ID.
     *
     * @param int $id
     * @param array $relations
     * @return Member|null
     */
    public function getMemberById(int $id, array $relations = []): ?Member
    {
        return $this->memberRepository->find($id, $relations);
    }

    /**
     * Create a new member with validation.
     *
     * @param array $data
     * @return Member
     * @throws ValidationException
     */
    public function createMember(array $data): Member
    {
        $this->validateMemberData($data);
        
        return $this->memberRepository->create($data);
    }

    /**
     * Update a member with validation.
     *
     * @param int $id
     * @param array $data
     * @return Member
     * @throws ValidationException
     * @throws \Exception
     */
    public function updateMember(int $id, array $data): Member
    {
        $member = $this->memberRepository->find($id);
        
        if (!$member) {
            throw new \Exception("Member not found with ID: {$id}");
        }

        $this->validateMemberData($data, $id);
        
        $this->memberRepository->update($id, $data);
        
        return $this->memberRepository->find($id);
    }

    /**
     * Delete a member.
     *
     * @param int $id
     * @return bool
     * @throws \Exception
     */
    public function deleteMember(int $id): bool
    {
        $member = $this->memberRepository->find($id);
        
        if (!$member) {
            throw new \Exception("Member not found with ID: {$id}");
        }

        return $this->memberRepository->delete($id);
    }

    /**
     * Search members by query string.
     *
     * @param string $query
     * @param array $relations
     * @return Collection
     */
    public function searchMembers(string $query, array $relations = []): Collection
    {
        if (empty(trim($query))) {
            return $this->memberRepository->all($relations);
        }

        return $this->memberRepository->search($query, $relations);
    }

    /**
     * Filter members by status.
     *
     * @param string $status
     * @param array $relations
     * @return Collection
     * @throws ValidationException
     */
    public function filterMembersByStatus(string $status, array $relations = []): Collection
    {
        $this->validateStatus($status);
        
        return $this->memberRepository->filterByStatus($status, $relations);
    }

    /**
     * Filter members by small group.
     *
     * @param int $smallGroupId
     * @param array $relations
     * @return Collection
     */
    public function filterMembersBySmallGroup(int $smallGroupId, array $relations = []): Collection
    {
        return $this->memberRepository->filterBySmallGroup($smallGroupId, $relations);
    }

    /**
     * Get paginated members with filters.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     * @throws ValidationException
     */
    public function getPaginatedMembers(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        // Validate status filter if provided
        if (isset($filters['status']) && !empty($filters['status'])) {
            $this->validateStatus($filters['status']);
        }

        return $this->memberRepository->paginate($perPage, $filters, $relations);
    }

    /**
     * Get member count by status.
     *
     * @param string $status
     * @return int
     * @throws ValidationException
     */
    public function getMemberCountByStatus(string $status): int
    {
        $this->validateStatus($status);
        
        return $this->memberRepository->countByStatus($status);
    }

    /**
     * Get new visitors for the current month.
     *
     * @return Collection
     */
    public function getNewVisitorsThisMonth(): Collection
    {
        return $this->memberRepository->getNewVisitorsThisMonth();
    }

    /**
     * Validate member data.
     *
     * @param array $data
     * @param int|null $memberId
     * @return void
     * @throws ValidationException
     */
    protected function validateMemberData(array $data, ?int $memberId = null): void
    {
        $rules = [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|unique:members,email' . ($memberId ? ",{$memberId}" : ''),
            'phone' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'status' => 'required|in:active,visitor',
            'small_group_id' => 'nullable|exists:small_groups,id',
            'date_joined' => 'required|date',
            'birth_date' => 'nullable|date',
            'gender' => 'required|in:male,female,other',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Validate status value.
     *
     * @param string $status
     * @return void
     * @throws ValidationException
     */
    protected function validateStatus(string $status): void
    {
        $validator = Validator::make(
            ['status' => $status],
            ['status' => 'required|in:active,visitor']
        );

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
