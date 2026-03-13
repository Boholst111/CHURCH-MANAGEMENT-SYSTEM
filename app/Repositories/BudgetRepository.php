<?php

namespace App\Repositories;

use App\Models\Budget;
use App\Models\BudgetItem;
use App\Models\Offering;
use App\Models\Expense;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class BudgetRepository
{
    /**
     * Get all budgets with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function all(array $relations = []): Collection
    {
        $query = Budget::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->get();
    }

    /**
     * Find a budget by ID with optional eager loading.
     *
     * @param int $id
     * @param array $relations
     * @return Budget|null
     */
    public function find(int $id, array $relations = []): ?Budget
    {
        $query = Budget::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->find($id);
    }

    /**
     * Create a new budget record.
     *
     * @param array $data
     * @return Budget
     */
    public function create(array $data): Budget
    {
        return Budget::create($data);
    }

    /**
     * Update a budget record.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $budget = Budget::find($id);
        
        if (!$budget) {
            return false;
        }

        return $budget->update($data);
    }

    /**
     * Delete a budget record.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $budget = Budget::find($id);
        
        if (!$budget) {
            return false;
        }

        return $budget->delete();
    }

    /**
     * Get active budgets.
     *
     * @param array $relations
     * @return Collection
     */
    public function getActive(array $relations = []): Collection
    {
        $query = Budget::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('is_active', true)->get();
    }

    /**
     * Get budgets within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @param array $relations
     * @return Collection
     */
    public function getByDateRange(string $startDate, string $endDate, array $relations = []): Collection
    {
        $query = Budget::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where(function ($q) use ($startDate, $endDate) {
            $q->whereBetween('start_date', [$startDate, $endDate])
              ->orWhereBetween('end_date', [$startDate, $endDate])
              ->orWhere(function ($q2) use ($startDate, $endDate) {
                  $q2->where('start_date', '<=', $startDate)
                     ->where('end_date', '>=', $endDate);
              });
        })->get();
    }

    /**
     * Get budgets by period type.
     *
     * @param string $periodType
     * @param array $relations
     * @return Collection
     */
    public function getByPeriodType(string $periodType, array $relations = []): Collection
    {
        $query = Budget::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        return $query->where('period_type', $periodType)->get();
    }

    /**
     * Create a budget with items.
     *
     * @param array $budgetData
     * @param array $items
     * @return Budget
     */
    public function createWithItems(array $budgetData, array $items): Budget
    {
        return DB::transaction(function () use ($budgetData, $items) {
            $budget = Budget::create($budgetData);

            foreach ($items as $item) {
                $budget->items()->create($item);
            }

            return $budget->load('items');
        });
    }

    /**
     * Update a budget with items.
     *
     * @param int $id
     * @param array $budgetData
     * @param array|null $items
     * @return bool
     */
    public function updateWithItems(int $id, array $budgetData, ?array $items = null): bool
    {
        return DB::transaction(function () use ($id, $budgetData, $items) {
            $budget = Budget::find($id);
            
            if (!$budget) {
                return false;
            }

            $budget->update($budgetData);

            if ($items !== null) {
                // Delete existing items and create new ones
                $budget->items()->delete();
                
                foreach ($items as $item) {
                    $budget->items()->create($item);
                }
            }

            return true;
        });
    }

    /**
     * Calculate actual amounts for a budget.
     * Returns actual income and expense amounts for each budget item.
     *
     * @param int $budgetId
     * @return array
     */
    public function calculateActualAmounts(int $budgetId): array
    {
        $budget = Budget::with('items')->find($budgetId);
        
        if (!$budget) {
            return [];
        }

        $results = [];

        foreach ($budget->items as $item) {
            $actualAmount = 0;

            if ($item->category_type === 'income') {
                // Calculate actual income from offerings
                $actualAmount = Offering::where('offering_type_id', $item->category_id)
                    ->whereBetween('date', [$budget->start_date, $budget->end_date])
                    ->sum('amount');
            } elseif ($item->category_type === 'expense') {
                // Calculate actual expenses
                $actualAmount = Expense::where('expense_category_id', $item->category_id)
                    ->whereBetween('date', [$budget->start_date, $budget->end_date])
                    ->sum('amount');
            }

            $results[] = [
                'budget_item_id' => $item->id,
                'category_type' => $item->category_type,
                'category_id' => $item->category_id,
                'budgeted_amount' => (float) $item->budgeted_amount,
                'actual_amount' => (float) $actualAmount,
            ];
        }

        return $results;
    }

    /**
     * Calculate variance for a budget.
     * Returns variance amount and percentage for each budget item.
     *
     * @param int $budgetId
     * @return array
     */
    public function calculateVariance(int $budgetId): array
    {
        $actualAmounts = $this->calculateActualAmounts($budgetId);
        
        $results = [];

        foreach ($actualAmounts as $item) {
            $budgetedAmount = $item['budgeted_amount'];
            $actualAmount = $item['actual_amount'];
            
            // Variance = Actual - Budgeted
            $varianceAmount = $actualAmount - $budgetedAmount;
            
            // Variance Percentage = ((Actual - Budgeted) / Budgeted) * 100
            $variancePercentage = $budgetedAmount > 0 
                ? (($actualAmount - $budgetedAmount) / $budgetedAmount) * 100 
                : 0;

            $results[] = [
                'budget_item_id' => $item['budget_item_id'],
                'category_type' => $item['category_type'],
                'category_id' => $item['category_id'],
                'budgeted_amount' => $budgetedAmount,
                'actual_amount' => $actualAmount,
                'variance_amount' => round($varianceAmount, 2),
                'variance_percentage' => round($variancePercentage, 2),
            ];
        }

        return $results;
    }

    /**
     * Get budget variance report with category details.
     *
     * @param int $budgetId
     * @return array
     */
    public function getVarianceReport(int $budgetId): array
    {
        $budget = Budget::with('items')->find($budgetId);
        
        if (!$budget) {
            return [];
        }

        $variance = $this->calculateVariance($budgetId);
        
        // Enrich with category names
        foreach ($variance as &$item) {
            $budgetItem = BudgetItem::with('category')->find($item['budget_item_id']);
            
            if ($budgetItem) {
                $category = null;
                
                if ($item['category_type'] === 'income') {
                    $category = \App\Models\OfferingType::find($item['category_id']);
                } elseif ($item['category_type'] === 'expense') {
                    $category = \App\Models\ExpenseCategory::find($item['category_id']);
                }
                
                $item['category_name'] = $category ? $category->name : 'Unknown';
                $item['notes'] = $budgetItem->notes;
            }
        }

        return [
            'budget_id' => $budget->id,
            'budget_name' => $budget->name,
            'period_type' => $budget->period_type,
            'start_date' => $budget->start_date->format('Y-m-d'),
            'end_date' => $budget->end_date->format('Y-m-d'),
            'items' => $variance,
        ];
    }

    /**
     * Get budget items that exceed threshold percentage.
     *
     * @param int $budgetId
     * @param float $thresholdPercentage
     * @return array
     */
    public function getItemsExceedingThreshold(int $budgetId, float $thresholdPercentage = 80.0): array
    {
        $variance = $this->calculateVariance($budgetId);
        
        $exceeding = [];

        foreach ($variance as $item) {
            $budgetedAmount = $item['budgeted_amount'];
            $actualAmount = $item['actual_amount'];
            
            if ($budgetedAmount > 0) {
                $percentageUsed = ($actualAmount / $budgetedAmount) * 100;
                
                if ($percentageUsed >= $thresholdPercentage) {
                    $exceeding[] = array_merge($item, [
                        'percentage_used' => round($percentageUsed, 2),
                    ]);
                }
            }
        }

        return $exceeding;
    }

    /**
     * Get budget items that are over budget.
     *
     * @param int $budgetId
     * @return array
     */
    public function getOverBudgetItems(int $budgetId): array
    {
        $variance = $this->calculateVariance($budgetId);
        
        $overBudget = [];

        foreach ($variance as $item) {
            // For expenses, over budget means actual > budgeted
            // For income, under budget means actual < budgeted
            if ($item['category_type'] === 'expense' && $item['variance_amount'] > 0) {
                $overBudget[] = $item;
            } elseif ($item['category_type'] === 'income' && $item['variance_amount'] < 0) {
                $overBudget[] = $item;
            }
        }

        return $overBudget;
    }

    /**
     * Get total budgeted amount for a budget.
     *
     * @param int $budgetId
     * @param string|null $categoryType
     * @return float
     */
    public function getTotalBudgeted(int $budgetId, ?string $categoryType = null): float
    {
        $query = BudgetItem::where('budget_id', $budgetId);

        if ($categoryType !== null) {
            $query->where('category_type', $categoryType);
        }

        return $query->sum('budgeted_amount');
    }

    /**
     * Get total actual amount for a budget.
     *
     * @param int $budgetId
     * @param string|null $categoryType
     * @return float
     */
    public function getTotalActual(int $budgetId, ?string $categoryType = null): float
    {
        $actualAmounts = $this->calculateActualAmounts($budgetId);
        
        $total = 0;

        foreach ($actualAmounts as $item) {
            if ($categoryType === null || $item['category_type'] === $categoryType) {
                $total += $item['actual_amount'];
            }
        }

        return $total;
    }

    /**
     * Get budget summary with totals.
     *
     * @param int $budgetId
     * @return array
     */
    public function getSummary(int $budgetId): array
    {
        $budget = Budget::find($budgetId);
        
        if (!$budget) {
            return [];
        }

        $totalBudgetedIncome = $this->getTotalBudgeted($budgetId, 'income');
        $totalBudgetedExpense = $this->getTotalBudgeted($budgetId, 'expense');
        $totalActualIncome = $this->getTotalActual($budgetId, 'income');
        $totalActualExpense = $this->getTotalActual($budgetId, 'expense');

        $incomeVariance = $totalActualIncome - $totalBudgetedIncome;
        $expenseVariance = $totalActualExpense - $totalBudgetedExpense;
        
        $netBudgeted = $totalBudgetedIncome - $totalBudgetedExpense;
        $netActual = $totalActualIncome - $totalActualExpense;
        $netVariance = $netActual - $netBudgeted;

        return [
            'budget_id' => $budget->id,
            'budget_name' => $budget->name,
            'period_type' => $budget->period_type,
            'start_date' => $budget->start_date->format('Y-m-d'),
            'end_date' => $budget->end_date->format('Y-m-d'),
            'income' => [
                'budgeted' => round($totalBudgetedIncome, 2),
                'actual' => round($totalActualIncome, 2),
                'variance' => round($incomeVariance, 2),
                'variance_percentage' => $totalBudgetedIncome > 0 
                    ? round(($incomeVariance / $totalBudgetedIncome) * 100, 2) 
                    : 0,
            ],
            'expense' => [
                'budgeted' => round($totalBudgetedExpense, 2),
                'actual' => round($totalActualExpense, 2),
                'variance' => round($expenseVariance, 2),
                'variance_percentage' => $totalBudgetedExpense > 0 
                    ? round(($expenseVariance / $totalBudgetedExpense) * 100, 2) 
                    : 0,
            ],
            'net' => [
                'budgeted' => round($netBudgeted, 2),
                'actual' => round($netActual, 2),
                'variance' => round($netVariance, 2),
            ],
        ];
    }

    /**
     * Copy a budget to a new period.
     *
     * @param int $budgetId
     * @param array $newPeriodData
     * @return Budget|null
     */
    public function copyBudget(int $budgetId, array $newPeriodData): ?Budget
    {
        $sourceBudget = Budget::with('items')->find($budgetId);
        
        if (!$sourceBudget) {
            return null;
        }

        return DB::transaction(function () use ($sourceBudget, $newPeriodData) {
            // Create new budget
            $newBudget = Budget::create([
                'name' => $newPeriodData['name'] ?? $sourceBudget->name,
                'period_type' => $newPeriodData['period_type'] ?? $sourceBudget->period_type,
                'start_date' => $newPeriodData['start_date'],
                'end_date' => $newPeriodData['end_date'],
                'is_active' => $newPeriodData['is_active'] ?? true,
                'notes' => $newPeriodData['notes'] ?? $sourceBudget->notes,
            ]);

            // Copy budget items
            foreach ($sourceBudget->items as $item) {
                $newBudget->items()->create([
                    'category_type' => $item->category_type,
                    'category_id' => $item->category_id,
                    'budgeted_amount' => $item->budgeted_amount,
                    'notes' => $item->notes,
                ]);
            }

            return $newBudget->load('items');
        });
    }

    /**
     * Get paginated budgets with optional filters.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        $query = Budget::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        // Apply period type filter
        if (isset($filters['period_type']) && !empty($filters['period_type'])) {
            $query->where('period_type', $filters['period_type']);
        }

        // Apply active status filter
        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        // Apply date range filter
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $query->where(function ($q) use ($filters) {
                $q->whereBetween('start_date', [$filters['start_date'], $filters['end_date']])
                  ->orWhereBetween('end_date', [$filters['start_date'], $filters['end_date']]);
            });
        }

        return $query->orderBy('start_date', 'desc')->paginate($perPage);
    }
}
