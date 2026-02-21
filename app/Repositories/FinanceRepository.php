<?php

namespace App\Repositories;

use App\Models\Tithe;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class FinanceRepository
{
    /**
     * Get all tithes with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function all(array $relations = []): Collection
    {
        $query = Tithe::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->get();
    }

    /**
     * Find a tithe by ID with optional eager loading.
     *
     * @param int $id
     * @param array $relations
     * @return Tithe|null
     */
    public function find(int $id, array $relations = []): ?Tithe
    {
        $query = Tithe::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->find($id);
    }

    /**
     * Create a new tithe record.
     *
     * @param array $data
     * @return Tithe
     */
    public function create(array $data): Tithe
    {
        return Tithe::create($data);
    }

    /**
     * Update a tithe record.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $tithe = Tithe::find($id);
        
        if (!$tithe) {
            return false;
        }

        return $tithe->update($data);
    }

    /**
     * Delete a tithe record.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $tithe = Tithe::find($id);
        
        if (!$tithe) {
            return false;
        }

        return $tithe->delete();
    }

    /**
     * Get tithes within a date range with optional eager loading.
     *
     * @param string $startDate
     * @param string $endDate
     * @param array $relations
     * @return Collection
     */
    public function getByDateRange(string $startDate, string $endDate, array $relations = []): Collection
    {
        $query = Tithe::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Filter tithes by payment method.
     *
     * @param string $paymentMethod
     * @param array $relations
     * @return Collection
     */
    public function filterByPaymentMethod(string $paymentMethod, array $relations = []): Collection
    {
        $query = Tithe::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('payment_method', $paymentMethod)->get();
    }

    /**
     * Filter tithes by member.
     *
     * @param int $memberId
     * @param array $relations
     * @return Collection
     */
    public function filterByMember(int $memberId, array $relations = []): Collection
    {
        $query = Tithe::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('member_id', $memberId)->get();
    }

    /**
     * Get paginated tithes with optional filters and eager loading.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = Tithe::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        // Apply date range filter
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
        }

        // Apply payment method filter
        if (isset($filters['payment_method']) && !empty($filters['payment_method'])) {
            $query->where('payment_method', $filters['payment_method']);
        }

        // Apply member filter
        if (isset($filters['member_id']) && !empty($filters['member_id'])) {
            $query->where('member_id', $filters['member_id']);
        }

        return $query->orderBy('date', 'desc')->paginate($perPage);
    }

    /**
     * Get total tithes for the current month.
     *
     * @return float
     */
    public function getTotalForCurrentMonth(): float
    {
        return Tithe::whereMonth('date', now()->month)
            ->whereYear('date', now()->year)
            ->sum('amount');
    }

    /**
     * Get total tithes within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getTotalByDateRange(string $startDate, string $endDate): float
    {
        return Tithe::whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
    }

    /**
     * Get average tithe amount per member within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getAveragePerMember(string $startDate, string $endDate): float
    {
        $total = $this->getTotalByDateRange($startDate, $endDate);
        $uniqueMembers = Tithe::whereBetween('date', [$startDate, $endDate])
            ->whereNotNull('member_id')
            ->distinct('member_id')
            ->count('member_id');

        return $uniqueMembers > 0 ? $total / $uniqueMembers : 0;
    }

    /**
     * Get monthly giving totals for the past N months.
     *
     * @param int $months
     * @return Collection
     */
    public function getMonthlyTotals(int $months = 12): Collection
    {
        return Tithe::select(
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
     * Get tithes with member information (optimized query).
     *
     * @return Collection
     */
    public function getAllWithMembers(): Collection
    {
        return Tithe::with('member')->get();
    }

    /**
     * Search tithes by member name or notes.
     *
     * @param string $query
     * @param array $relations
     * @return Collection
     */
    public function search(string $query, array $relations = []): Collection
    {
        $searchQuery = Tithe::query();

        if (!empty($relations)) {
            $searchQuery->with($relations);
        }

        return $searchQuery->where(function ($q) use ($query) {
            $q->where('notes', 'like', "%{$query}%")
              ->orWhereHas('member', function ($memberQuery) use ($query) {
                  $memberQuery->where('first_name', 'like', "%{$query}%")
                      ->orWhere('last_name', 'like', "%{$query}%");
              });
        })->get();
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
        $tithes = Tithe::whereBetween('date', [$startDate, $endDate])->get();

        return [
            'total_giving' => $tithes->sum('amount'),
            'total_transactions' => $tithes->count(),
            'average_transaction' => $tithes->avg('amount') ?? 0,
            'unique_givers' => $tithes->whereNotNull('member_id')->unique('member_id')->count(),
            'by_payment_method' => $tithes->groupBy('payment_method')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('amount'),
                ];
            }),
        ];
    }
}
