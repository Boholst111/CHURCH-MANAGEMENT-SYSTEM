<?php

namespace App\Repositories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ExpenseRepository
{
    /**
     * Get all expenses with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function all(array $relations = []): Collection
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->get();
    }

    /**
     * Find an expense by ID with optional eager loading.
     *
     * @param int $id
     * @param array $relations
     * @return Expense|null
     */
    public function find(int $id, array $relations = []): ?Expense
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->find($id);
    }

    /**
     * Create a new expense record.
     *
     * @param array $data
     * @return Expense
     */
    public function create(array $data): Expense
    {
        return Expense::create($data);
    }

    /**
     * Update an expense record.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $expense = Expense::find($id);
        
        if (!$expense) {
            return false;
        }

        return $expense->update($data);
    }

    /**
     * Delete an expense record (soft delete).
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $expense = Expense::find($id);
        
        if (!$expense) {
            return false;
        }

        return $expense->delete();
    }

    /**
     * Get expenses within a date range with optional eager loading.
     *
     * @param string $startDate
     * @param string $endDate
     * @param array $relations
     * @return Collection
     */
    public function getByDateRange(string $startDate, string $endDate, array $relations = []): Collection
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Filter expenses by category.
     *
     * @param int $categoryId
     * @param array $relations
     * @return Collection
     */
    public function filterByCategory(int $categoryId, array $relations = []): Collection
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('expense_category_id', $categoryId)->get();
    }

    /**
     * Filter expenses by vendor.
     *
     * @param int $vendorId
     * @param array $relations
     * @return Collection
     */
    public function filterByVendor(int $vendorId, array $relations = []): Collection
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('vendor_id', $vendorId)->get();
    }

    /**
     * Filter expenses by approval status.
     *
     * @param string $status
     * @param array $relations
     * @return Collection
     */
    public function filterByStatus(string $status, array $relations = []): Collection
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('approval_status', $status)->get();
    }

    /**
     * Filter expenses by amount range.
     *
     * @param float $minAmount
     * @param float|null $maxAmount
     * @param array $relations
     * @return Collection
     */
    public function filterByAmountRange(float $minAmount, ?float $maxAmount = null, array $relations = []): Collection
    {
        $query = Expense::query();

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
     * Filter expenses by fund.
     *
     * @param int $fundId
     * @param array $relations
     * @return Collection
     */
    public function filterByFund(int $fundId, array $relations = []): Collection
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('fund_id', $fundId)->get();
    }

    /**
     * Get pending expenses (awaiting approval).
     *
     * @param array $relations
     * @return Collection
     */
    public function getPending(array $relations = []): Collection
    {
        return $this->filterByStatus('pending', $relations);
    }

    /**
     * Get approved expenses.
     *
     * @param array $relations
     * @return Collection
     */
    public function getApproved(array $relations = []): Collection
    {
        return $this->filterByStatus('approved', $relations);
    }

    /**
     * Get rejected expenses.
     *
     * @param array $relations
     * @return Collection
     */
    public function getRejected(array $relations = []): Collection
    {
        return $this->filterByStatus('rejected', $relations);
    }

    /**
     * Get paginated expenses with optional filters and eager loading.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        // Apply date range filter
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
        }

        // Apply category filter
        if (isset($filters['expense_category_id']) && !empty($filters['expense_category_id'])) {
            $query->where('expense_category_id', $filters['expense_category_id']);
        }

        // Apply vendor filter
        if (isset($filters['vendor_id']) && !empty($filters['vendor_id'])) {
            $query->where('vendor_id', $filters['vendor_id']);
        }

        // Apply approval status filter
        if (isset($filters['approval_status']) && !empty($filters['approval_status'])) {
            $query->where('approval_status', $filters['approval_status']);
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

        // Apply approver filter
        if (isset($filters['approved_by']) && !empty($filters['approved_by'])) {
            $query->where('approved_by', $filters['approved_by']);
        }

        return $query->orderBy('date', 'desc')->paginate($perPage);
    }

    /**
     * Search expenses by vendor name or description.
     *
     * @param string $query
     * @param array $relations
     * @return Collection
     */
    public function search(string $query, array $relations = []): Collection
    {
        $searchQuery = Expense::query();

        if (!empty($relations)) {
            $searchQuery->with($relations);
        }

        return $searchQuery->where(function ($q) use ($query) {
            $q->where('description', 'like', "%{$query}%")
              ->orWhereHas('vendor', function ($vendorQuery) use ($query) {
                  $vendorQuery->where('name', 'like', "%{$query}%");
              })
              ->orWhereHas('category', function ($categoryQuery) use ($query) {
                  $categoryQuery->where('name', 'like', "%{$query}%");
              });
        })->get();
    }

    /**
     * Get total expenses for the current month.
     *
     * @return float
     */
    public function getTotalForCurrentMonth(): float
    {
        return Expense::whereMonth('date', now()->month)
            ->whereYear('date', now()->year)
            ->sum('amount');
    }

    /**
     * Get total expenses within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getTotalByDateRange(string $startDate, string $endDate): float
    {
        return Expense::whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
    }

    /**
     * Get monthly expense totals for the past N months.
     *
     * @param int $months
     * @return Collection
     */
    public function getMonthlyTotals(int $months = 12): Collection
    {
        return Expense::select(
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
     * Get expenses with category and vendor information (optimized query).
     *
     * @return Collection
     */
    public function getAllWithRelations(): Collection
    {
        return Expense::with(['category', 'vendor', 'fund', 'approver'])->get();
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
        $expenses = Expense::whereBetween('date', [$startDate, $endDate])->get();

        return [
            'total_expenses' => $expenses->sum('amount'),
            'total_transactions' => $expenses->count(),
            'average_transaction' => $expenses->avg('amount') ?? 0,
            'by_category' => $expenses->groupBy('expense_category_id')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('amount'),
                ];
            }),
            'by_vendor' => $expenses->groupBy('vendor_id')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('amount'),
                ];
            }),
            'by_status' => $expenses->groupBy('approval_status')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('amount'),
                ];
            }),
            'by_fund' => $expenses->groupBy('fund_id')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('amount'),
                ];
            }),
        ];
    }

    /**
     * Get expenses by category and date range.
     *
     * @param int $categoryId
     * @param string $startDate
     * @param string $endDate
     * @return Collection
     */
    public function getByCategoryAndDateRange(int $categoryId, string $startDate, string $endDate): Collection
    {
        return Expense::where('expense_category_id', $categoryId)
            ->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Get expenses by vendor and date range.
     *
     * @param int $vendorId
     * @param string $startDate
     * @param string $endDate
     * @return Collection
     */
    public function getByVendorAndDateRange(int $vendorId, string $startDate, string $endDate): Collection
    {
        return Expense::where('vendor_id', $vendorId)
            ->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Get total expenses by vendor for a date range.
     *
     * @param int $vendorId
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getTotalByVendor(int $vendorId, string $startDate, string $endDate): float
    {
        return Expense::where('vendor_id', $vendorId)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
    }

    /**
     * Get total expenses by category for a date range.
     *
     * @param int $categoryId
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getTotalByCategory(int $categoryId, string $startDate, string $endDate): float
    {
        return Expense::where('expense_category_id', $categoryId)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
    }

    /**
     * Get expenses count by date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return int
     */
    public function getCountByDateRange(string $startDate, string $endDate): int
    {
        return Expense::whereBetween('date', [$startDate, $endDate])->count();
    }

    /**
     * Get expenses grouped by category for a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return Collection
     */
    public function getGroupedByCategory(string $startDate, string $endDate): Collection
    {
        return Expense::select(
                'expense_category_id',
                DB::raw('SUM(amount) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->whereBetween('date', [$startDate, $endDate])
            ->groupBy('expense_category_id')
            ->with('category')
            ->get();
    }

    /**
     * Get expenses grouped by vendor for a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return Collection
     */
    public function getGroupedByVendor(string $startDate, string $endDate): Collection
    {
        return Expense::select(
                'vendor_id',
                DB::raw('SUM(amount) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->whereNotNull('vendor_id')
            ->whereBetween('date', [$startDate, $endDate])
            ->groupBy('vendor_id')
            ->with('vendor')
            ->get();
    }

    /**
     * Get top vendors by expense amount for a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @param int $limit
     * @return Collection
     */
    public function getTopVendors(string $startDate, string $endDate, int $limit = 10): Collection
    {
        return Expense::select(
                'vendor_id',
                DB::raw('SUM(amount) as total_paid'),
                DB::raw('COUNT(*) as transaction_count')
            )
            ->whereNotNull('vendor_id')
            ->whereBetween('date', [$startDate, $endDate])
            ->groupBy('vendor_id')
            ->orderBy('total_paid', 'desc')
            ->limit($limit)
            ->with('vendor')
            ->get();
    }

    /**
     * Get expenses requiring approval (pending status).
     *
     * @param array $relations
     * @return Collection
     */
    public function getRequiringApproval(array $relations = []): Collection
    {
        return $this->getPending($relations);
    }

    /**
     * Get expenses approved by a specific user.
     *
     * @param int $userId
     * @param array $relations
     * @return Collection
     */
    public function getApprovedByUser(int $userId, array $relations = []): Collection
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('approved_by', $userId)
            ->where('approval_status', 'approved')
            ->get();
    }

    /**
     * Get total approved expenses for a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getTotalApproved(string $startDate, string $endDate): float
    {
        return Expense::where('approval_status', 'approved')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');
    }

    /**
     * Get total pending expenses.
     *
     * @return float
     */
    public function getTotalPending(): float
    {
        return Expense::where('approval_status', 'pending')->sum('amount');
    }

    /**
     * Get count of pending expenses.
     *
     * @return int
     */
    public function getCountPending(): int
    {
        return Expense::where('approval_status', 'pending')->count();
    }

    /**
     * Check if an expense has a receipt attached.
     *
     * @param int $id
     * @return bool
     */
    public function hasReceipt(int $id): bool
    {
        $expense = Expense::find($id);
        return $expense && !empty($expense->receipt_path);
    }

    /**
     * Get expenses without receipts.
     *
     * @param array $relations
     * @return Collection
     */
    public function getWithoutReceipts(array $relations = []): Collection
    {
        $query = Expense::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->whereNull('receipt_path')
            ->orWhere('receipt_path', '')
            ->get();
    }
}
