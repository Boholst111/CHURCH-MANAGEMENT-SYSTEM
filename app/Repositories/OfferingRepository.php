<?php

namespace App\Repositories;

use App\Models\Offering;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class OfferingRepository
{
    /**
     * Get all offerings with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function all(array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->get();
    }

    /**
     * Find an offering by ID with optional eager loading.
     *
     * @param int $id
     * @param array $relations
     * @return Offering|null
     */
    public function find(int $id, array $relations = []): ?Offering
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->find($id);
    }

    /**
     * Create a new offering record.
     *
     * @param array $data
     * @return Offering
     */
    public function create(array $data): Offering
    {
        return Offering::create($data);
    }

    /**
     * Update an offering record.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $offering = Offering::find($id);
        
        if (!$offering) {
            return false;
        }

        return $offering->update($data);
    }

    /**
     * Delete an offering record (soft delete).
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $offering = Offering::find($id);
        
        if (!$offering) {
            return false;
        }

        return $offering->delete();
    }

    /**
     * Get offerings within a date range with optional eager loading.
     *
     * @param string $startDate
     * @param string $endDate
     * @param array $relations
     * @return Collection
     */
    public function getByDateRange(string $startDate, string $endDate, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Filter offerings by offering type.
     *
     * @param int $offeringTypeId
     * @param array $relations
     * @return Collection
     */
    public function filterByType(int $offeringTypeId, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('offering_type_id', $offeringTypeId)->get();
    }

    /**
     * Filter offerings by payment method.
     *
     * @param string $paymentMethod
     * @param array $relations
     * @return Collection
     */
    public function filterByPaymentMethod(string $paymentMethod, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('payment_method', $paymentMethod)->get();
    }

    /**
     * Filter offerings by member.
     *
     * @param int $memberId
     * @param array $relations
     * @return Collection
     */
    public function filterByMember(int $memberId, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('member_id', $memberId)->get();
    }

    /**
     * Filter offerings by amount range.
     *
     * @param float $minAmount
     * @param float|null $maxAmount
     * @param array $relations
     * @return Collection
     */
    public function filterByAmountRange(float $minAmount, ?float $maxAmount = null, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        $query->where('amount', '>=', $minAmount);

        if ($maxAmount !== null) {
            $query->where('amount', '<=', $maxAmount);
        }

        return $query->get();
    }

    /**
     * Filter offerings by fund.
     *
     * @param int $fundId
     * @param array $relations
     * @return Collection
     */
    public function filterByFund(int $fundId, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('fund_id', $fundId)->get();
    }

    /**
     * Get anonymous offerings.
     *
     * @param array $relations
     * @return Collection
     */
    public function getAnonymous(array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('is_anonymous', true)->get();
    }

    /**
     * Get paginated offerings with optional filters and eager loading.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        // Apply date range filter
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
        }

        // Apply offering type filter
        if (isset($filters['offering_type_id']) && !empty($filters['offering_type_id'])) {
            $query->where('offering_type_id', $filters['offering_type_id']);
        }

        // Apply payment method filter
        if (isset($filters['payment_method']) && !empty($filters['payment_method'])) {
            $query->where('payment_method', $filters['payment_method']);
        }

        // Apply member filter
        if (isset($filters['member_id']) && !empty($filters['member_id'])) {
            $query->where('member_id', $filters['member_id']);
        }

        // Apply amount range filter
        if (isset($filters['min_amount'])) {
            $query->where('amount', '>=', $filters['min_amount']);
        }

        if (isset($filters['max_amount'])) {
            $query->where('amount', '<=', $filters['max_amount']);
        }

        // Apply fund filter
        if (isset($filters['fund_id']) && !empty($filters['fund_id'])) {
            $query->where('fund_id', $filters['fund_id']);
        }

        // Apply anonymous filter
        if (isset($filters['is_anonymous'])) {
            $query->where('is_anonymous', $filters['is_anonymous']);
        }

        // Apply recurring giving filter
        if (isset($filters['recurring_giving_id']) && !empty($filters['recurring_giving_id'])) {
            $query->where('recurring_giving_id', $filters['recurring_giving_id']);
        }

        // Apply pledge filter
        if (isset($filters['pledge_id']) && !empty($filters['pledge_id'])) {
            $query->where('pledge_id', $filters['pledge_id']);
        }

        return $query->orderBy('date', 'desc')->paginate($perPage);
    }

    /**
     * Search offerings by member name or notes.
     *
     * @param string $query
     * @param array $relations
     * @return Collection
     */
    public function search(string $query, array $relations = []): Collection
    {
        $searchQuery = Offering::query();

        if (!empty($relations)) {
            $searchQuery->with($relations);
        }

        return $searchQuery->where(function ($q) use ($query) {
            $q->where('notes', 'like', "%{$query}%")
              ->orWhere('receipt_number', 'like', "%{$query}%")
              ->orWhereHas('member', function ($memberQuery) use ($query) {
                  $memberQuery->where('first_name', 'like', "%{$query}%")
                      ->orWhere('last_name', 'like', "%{$query}%");
              });
        })->get();
    }

    /**
     * Get total offerings for the current month.
     *
     * @return float
     */
    public function getTotalForCurrentMonth(): float
    {
        return Offering::whereMonth('date', now()->month)
            ->whereYear('date', now()->year)
            ->sum('amount');
    }

    /**
     * Get total offerings within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getTotalByDateRange(string $startDate, string $endDate): float
    {
        return Offering::whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
    }

    /**
     * Get average offering amount per member within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getAveragePerMember(string $startDate, string $endDate): float
    {
        $total = $this->getTotalByDateRange($startDate, $endDate);
        $uniqueMembers = Offering::whereBetween('date', [$startDate, $endDate])
            ->whereNotNull('member_id')
            ->distinct('member_id')
            ->count('member_id');

        return $uniqueMembers > 0 ? $total / $uniqueMembers : 0;
    }

    /**
     * Get monthly offering totals for the past N months.
     *
     * @param int $months
     * @return Collection
     */
    public function getMonthlyTotals(int $months = 12): Collection
    {
        return Offering::select(
                DB::raw('YEAR(date) as year'),
                DB::raw('MONTH(date) as month'),
                DB::raw('SUM(amount) as total')
            )
            ->where('date', '>=', now()->subMonths($months))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();
    }

    /**
     * Get offerings with member information (optimized query).
     *
     * @return Collection
     */
    public function getAllWithMembers(): Collection
    {
        return Offering::with('member')->get();
    }

    /**
     * Get financial summary for a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return array
     */
    public function getSummary(string $startDate, string $endDate): array
    {
        $offerings = Offering::whereBetween('date', [$startDate, $endDate])->get();

        return [
            'total_giving' => $offerings->sum('amount'),
            'total_transactions' => $offerings->count(),
            'average_transaction' => $offerings->avg('amount') ?? 0,
            'unique_givers' => $offerings->whereNotNull('member_id')->unique('member_id')->count(),
            'by_payment_method' => $offerings->groupBy('payment_method')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('amount'),
                ];
            }),
            'by_offering_type' => $offerings->groupBy('offering_type_id')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('amount'),
                ];
            }),
            'by_fund' => $offerings->groupBy('fund_id')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('amount'),
                ];
            }),
        ];
    }

    /**
     * Get offerings by member for a specific year (for annual statements).
     *
     * @param int $memberId
     * @param int $year
     * @param array $relations
     * @return Collection
     */
    public function getByMemberAndYear(int $memberId, int $year, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('member_id', $memberId)
            ->whereYear('date', $year)
            ->orderBy('date', 'asc')
            ->get();
    }

    /**
     * Get offerings grouped by offering type for a member and year.
     *
     * @param int $memberId
     * @param int $year
     * @return Collection
     */
    public function getGroupedByTypeForMemberAndYear(int $memberId, int $year): Collection
    {
        return Offering::select(
                'offering_type_id',
                DB::raw('SUM(amount) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->where('member_id', $memberId)
            ->whereYear('date', $year)
            ->groupBy('offering_type_id')
            ->with('offeringType')
            ->get();
    }

    /**
     * Get top donors for a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @param int $limit
     * @return Collection
     */
    public function getTopDonors(string $startDate, string $endDate, int $limit = 10): Collection
    {
        return Offering::select(
                'member_id',
                DB::raw('SUM(amount) as total_given'),
                DB::raw('COUNT(*) as transaction_count')
            )
            ->whereNotNull('member_id')
            ->whereBetween('date', [$startDate, $endDate])
            ->groupBy('member_id')
            ->orderBy('total_given', 'desc')
            ->limit($limit)
            ->with('member')
            ->get();
    }

    /**
     * Get offerings by recurring giving schedule.
     *
     * @param int $recurringGivingId
     * @param array $relations
     * @return Collection
     */
    public function getByRecurringGiving(int $recurringGivingId, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('recurring_giving_id', $recurringGivingId)
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Get offerings by pledge.
     *
     * @param int $pledgeId
     * @param array $relations
     * @return Collection
     */
    public function getByPledge(int $pledgeId, array $relations = []): Collection
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('pledge_id', $pledgeId)
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Get total amount for a pledge.
     *
     * @param int $pledgeId
     * @return float
     */
    public function getTotalByPledge(int $pledgeId): float
    {
        return Offering::where('pledge_id', $pledgeId)->sum('amount');
    }

    /**
     * Get offerings by offering type and date range.
     *
     * @param int $offeringTypeId
     * @param string $startDate
     * @param string $endDate
     * @return Collection
     */
    public function getByTypeAndDateRange(int $offeringTypeId, string $startDate, string $endDate): Collection
    {
        return Offering::where('offering_type_id', $offeringTypeId)
            ->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Get offerings count by date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return int
     */
    public function getCountByDateRange(string $startDate, string $endDate): int
    {
        return Offering::whereBetween('date', [$startDate, $endDate])->count();
    }

    /**
     * Check if a receipt number exists.
     *
     * @param string $receiptNumber
     * @return bool
     */
    public function receiptNumberExists(string $receiptNumber): bool
    {
        return Offering::where('receipt_number', $receiptNumber)->exists();
    }

    /**
     * Get offering by receipt number.
     *
     * @param string $receiptNumber
     * @param array $relations
     * @return Offering|null
     */
    public function findByReceiptNumber(string $receiptNumber, array $relations = []): ?Offering
    {
        $query = Offering::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('receipt_number', $receiptNumber)->first();
    }
}
