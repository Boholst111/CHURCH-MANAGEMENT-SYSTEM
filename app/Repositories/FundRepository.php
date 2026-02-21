<?php

namespace App\Repositories;

use App\Models\Fund;
use App\Models\FundTransfer;
use App\Models\Offering;
use App\Models\Expense;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class FundRepository
{
    /**
     * Get all funds with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function all(array $relations = []): Collection
    {
        $query = Fund::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->get();
    }

    /**
     * Find a fund by ID with optional eager loading.
     *
     * @param int $id
     * @param array $relations
     * @return Fund|null
     */
    public function find(int $id, array $relations = []): ?Fund
    {
        $query = Fund::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->find($id);
    }

    /**
     * Create a new fund record.
     *
     * @param array $data
     * @return Fund
     */
    public function create(array $data): Fund
    {
        return Fund::create($data);
    }

    /**
     * Update a fund record.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $fund = Fund::find($id);
        
        if (!$fund) {
            return false;
        }

        return $fund->update($data);
    }

    /**
     * Delete a fund record.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $fund = Fund::find($id);
        
        if (!$fund) {
            return false;
        }

        return $fund->delete();
    }

    /**
     * Get active funds.
     *
     * @param array $relations
     * @return Collection
     */
    public function getActive(array $relations = []): Collection
    {
        $query = Fund::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('is_active', true)->get();
    }

    /**
     * Get funds by type (restricted or unrestricted).
     *
     * @param string $type
     * @param array $relations
     * @return Collection
     */
    public function getByType(string $type, array $relations = []): Collection
    {
        $query = Fund::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('type', $type)->get();
    }

    /**
     * Get paginated funds with optional filters and eager loading.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = Fund::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        // Apply type filter
        if (isset($filters['type']) && !empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        // Apply active status filter
        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        return $query->orderBy('name', 'asc')->paginate($perPage);
    }

    /**
     * Search funds by name or description.
     *
     * @param string $query
     * @param array $relations
     * @return Collection
     */
    public function search(string $query, array $relations = []): Collection
    {
        $searchQuery = Fund::query();

        if (!empty($relations)) {
            $searchQuery->with($relations);
        }

        return $searchQuery->where(function ($q) use ($query) {
            $q->where('name', 'like', "%{$query}%")
              ->orWhere('description', 'like', "%{$query}%");
        })->get();
    }

    /**
     * Calculate the current balance of a fund based on offerings, expenses, and transfers.
     *
     * @param int $fundId
     * @return float
     */
    public function calculateBalance(int $fundId): float
    {
        // Get total offerings to this fund
        $totalOfferings = Offering::where('fund_id', $fundId)->sum('amount');

        // Get total expenses from this fund
        $totalExpenses = Expense::where('fund_id', $fundId)->sum('amount');

        // Get total transfers out of this fund
        $totalTransfersOut = FundTransfer::where('from_fund_id', $fundId)->sum('amount');

        // Get total transfers into this fund
        $totalTransfersIn = FundTransfer::where('to_fund_id', $fundId)->sum('amount');

        // Calculate balance: offerings + transfers in - expenses - transfers out
        return $totalOfferings + $totalTransfersIn - $totalExpenses - $totalTransfersOut;
    }

    /**
     * Get the current balance of a fund.
     *
     * @param int $fundId
     * @return float
     */
    public function getBalance(int $fundId): float
    {
        return $this->calculateBalance($fundId);
    }

    /**
     * Update the current_balance field of a fund.
     *
     * @param int $fundId
     * @return bool
     */
    public function updateBalance(int $fundId): bool
    {
        $balance = $this->calculateBalance($fundId);
        
        return $this->update($fundId, ['current_balance' => $balance]);
    }

    /**
     * Get all transactions (offerings and expenses) for a fund.
     *
     * @param int $fundId
     * @param array $filters
     * @return array
     */
    public function getTransactions(int $fundId, array $filters = []): array
    {
        $offerings = Offering::where('fund_id', $fundId);
        $expenses = Expense::where('fund_id', $fundId);

        // Apply date range filter
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $offerings->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
            $expenses->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
        }

        $offeringsData = $offerings->get()->map(function ($offering) {
            return [
                'id' => $offering->id,
                'type' => 'offering',
                'date' => $offering->date,
                'amount' => $offering->amount,
                'description' => $offering->notes ?? 'Offering',
                'related_id' => $offering->id,
            ];
        });

        $expensesData = $expenses->get()->map(function ($expense) {
            return [
                'id' => $expense->id,
                'type' => 'expense',
                'date' => $expense->date,
                'amount' => -$expense->amount, // Negative for expenses
                'description' => $expense->description,
                'related_id' => $expense->id,
            ];
        });

        // Combine and sort by date
        $transactions = $offeringsData->concat($expensesData)->sortByDesc('date')->values();

        return $transactions->toArray();
    }

    /**
     * Get transaction history for a fund with running balance.
     *
     * @param int $fundId
     * @param array $filters
     * @return array
     */
    public function getTransactionHistory(int $fundId, array $filters = []): array
    {
        $transactions = $this->getTransactions($fundId, $filters);
        
        // Calculate running balance
        $balance = 0;
        $history = [];

        // Sort transactions by date ascending for balance calculation
        usort($transactions, function ($a, $b) {
            return strtotime($a['date']) - strtotime($b['date']);
        });

        foreach ($transactions as $transaction) {
            $balance += $transaction['amount'];
            $transaction['balance'] = $balance;
            $history[] = $transaction;
        }

        // Reverse to show most recent first
        return array_reverse($history);
    }

    /**
     * Get fund summary including balance, total income, and total expenses.
     *
     * @param int $fundId
     * @param array $filters
     * @return array
     */
    public function getSummary(int $fundId, array $filters = []): array
    {
        $offeringsQuery = Offering::where('fund_id', $fundId);
        $expensesQuery = Expense::where('fund_id', $fundId);
        $transfersInQuery = FundTransfer::where('to_fund_id', $fundId);
        $transfersOutQuery = FundTransfer::where('from_fund_id', $fundId);

        // Apply date range filter
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $offeringsQuery->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
            $expensesQuery->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
            $transfersInQuery->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
            $transfersOutQuery->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
        }

        $totalOfferings = $offeringsQuery->sum('amount');
        $totalExpenses = $expensesQuery->sum('amount');
        $totalTransfersIn = $transfersInQuery->sum('amount');
        $totalTransfersOut = $transfersOutQuery->sum('amount');

        $totalIncome = $totalOfferings + $totalTransfersIn;
        $totalOutflow = $totalExpenses + $totalTransfersOut;
        $netChange = $totalIncome - $totalOutflow;

        return [
            'fund_id' => $fundId,
            'current_balance' => $this->getBalance($fundId),
            'total_offerings' => $totalOfferings,
            'total_expenses' => $totalExpenses,
            'total_transfers_in' => $totalTransfersIn,
            'total_transfers_out' => $totalTransfersOut,
            'total_income' => $totalIncome,
            'total_outflow' => $totalOutflow,
            'net_change' => $netChange,
            'offering_count' => Offering::where('fund_id', $fundId)->count(),
            'expense_count' => Expense::where('fund_id', $fundId)->count(),
        ];
    }

    /**
     * Get total income for a fund within a date range.
     *
     * @param int $fundId
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getTotalIncome(int $fundId, string $startDate, string $endDate): float
    {
        $offerings = Offering::where('fund_id', $fundId)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        $transfersIn = FundTransfer::where('to_fund_id', $fundId)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        return $offerings + $transfersIn;
    }

    /**
     * Get total expenses for a fund within a date range.
     *
     * @param int $fundId
     * @param string $startDate
     * @param string $endDate
     * @return float
     */
    public function getTotalExpenses(int $fundId, string $startDate, string $endDate): float
    {
        $expenses = Expense::where('fund_id', $fundId)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        $transfersOut = FundTransfer::where('from_fund_id', $fundId)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        return $expenses + $transfersOut;
    }

    /**
     * Get all transfers for a fund (both incoming and outgoing).
     *
     * @param int $fundId
     * @param array $filters
     * @return Collection
     */
    public function getTransfers(int $fundId, array $filters = []): Collection
    {
        $query = FundTransfer::where(function ($q) use ($fundId) {
            $q->where('from_fund_id', $fundId)
              ->orWhere('to_fund_id', $fundId);
        });

        // Apply date range filter
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->whereBetween('date', [$filters['start_date'], $filters['end_date']]);
        }

        return $query->with(['fromFund', 'toFund', 'createdBy'])
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Check if a fund has sufficient balance for an expense or transfer.
     *
     * @param int $fundId
     * @param float $amount
     * @return bool
     */
    public function hasSufficientBalance(int $fundId, float $amount): bool
    {
        $balance = $this->getBalance($fundId);
        return $balance >= $amount;
    }

    /**
     * Get funds with low balance (below a threshold).
     *
     * @param float $threshold
     * @param array $relations
     * @return Collection
     */
    public function getLowBalanceFunds(float $threshold = 0, array $relations = []): Collection
    {
        $query = Fund::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('is_active', true)
            ->where('current_balance', '<=', $threshold)
            ->get();
    }

    /**
     * Get fund balances summary for all funds.
     *
     * @return array
     */
    public function getAllBalances(): array
    {
        $funds = Fund::where('is_active', true)->get();

        return $funds->map(function ($fund) {
            return [
                'id' => $fund->id,
                'name' => $fund->name,
                'type' => $fund->type,
                'balance' => $this->getBalance($fund->id),
            ];
        })->toArray();
    }

    /**
     * Get total balance across all funds.
     *
     * @return float
     */
    public function getTotalBalance(): float
    {
        $funds = Fund::where('is_active', true)->get();
        $total = 0;

        foreach ($funds as $fund) {
            $total += $this->getBalance($fund->id);
        }

        return $total;
    }

    /**
     * Get total balance for restricted funds.
     *
     * @return float
     */
    public function getTotalRestrictedBalance(): float
    {
        $funds = Fund::where('is_active', true)
            ->where('type', 'restricted')
            ->get();
        
        $total = 0;

        foreach ($funds as $fund) {
            $total += $this->getBalance($fund->id);
        }

        return $total;
    }

    /**
     * Get total balance for unrestricted funds.
     *
     * @return float
     */
    public function getTotalUnrestrictedBalance(): float
    {
        $funds = Fund::where('is_active', true)
            ->where('type', 'unrestricted')
            ->get();
        
        $total = 0;

        foreach ($funds as $fund) {
            $total += $this->getBalance($fund->id);
        }

        return $total;
    }

    /**
     * Check if a fund name exists.
     *
     * @param string $name
     * @param int|null $excludeId
     * @return bool
     */
    public function nameExists(string $name, ?int $excludeId = null): bool
    {
        $query = Fund::where('name', $name);

        if ($excludeId !== null) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }
}
