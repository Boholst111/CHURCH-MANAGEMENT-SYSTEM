<?php

namespace App\Services;

use App\Repositories\FinanceRepository;
use App\Repositories\MemberRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class ReportService
{
    protected $financeRepository;
    protected $memberRepository;

    public function __construct(
        FinanceRepository $financeRepository,
        MemberRepository $memberRepository
    ) {
        $this->financeRepository = $financeRepository;
        $this->memberRepository = $memberRepository;
    }

    /**
     * Generate financial report data for a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return array
     */
    public function generateFinancialReport(string $startDate, string $endDate): array
    {
        $summary = $this->financeRepository->getSummary($startDate, $endDate);
        $monthlyTotals = $this->financeRepository->getMonthlyTotals(12);
        $averagePerMember = $this->financeRepository->getAveragePerMember($startDate, $endDate);

        return [
            'period' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'summary' => $summary,
            'average_per_member' => $averagePerMember,
            'monthly_totals' => $monthlyTotals,
            'trends' => $this->calculateGivingTrends($monthlyTotals),
        ];
    }

    /**
     * Generate demographic data aggregation.
     *
     * @return array
     */
    public function generateDemographicReport(): array
    {
        $members = $this->memberRepository->all();

        return [
            'by_age' => $this->aggregateByAge($members),
            'by_location' => $this->aggregateByLocation($members),
            'by_gender' => $this->aggregateByGender($members),
            'by_status' => $this->aggregateByStatus($members),
            'by_small_group' => $this->aggregateBySmallGroup($members),
            'total_members' => $members->count(),
        ];
    }

    /**
     * Generate PDF report for financial data.
     *
     * @param string $startDate
     * @param string $endDate
     * @return \Illuminate\Http\Response
     */
    public function generateFinancialPDF(string $startDate, string $endDate)
    {
        $reportData = $this->generateFinancialReport($startDate, $endDate);
        
        $pdf = Pdf::loadView('reports.financial', [
            'report' => $reportData,
            'generated_at' => now()->format('Y-m-d H:i:s'),
        ]);

        return $pdf->download('financial-report-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Generate Financial Summary PDF.
     *
     * @param string $startDate
     * @param string $endDate
     * @return \Illuminate\Http\Response
     */
    public function generateFinancialSummaryPDF(string $startDate, string $endDate)
    {
        $data = [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'offerings' => DB::table('offerings')
                ->whereBetween('date', [$startDate, $endDate])
                ->sum('amount'),
            'expenses' => DB::table('expenses')
                ->where('approval_status', 'approved')
                ->whereBetween('date', [$startDate, $endDate])
                ->sum('amount'),
            'generated_at' => now()->format('Y-m-d H:i:s'),
        ];
        
        $data['net_position'] = $data['offerings'] - $data['expenses'];
        
        $pdf = Pdf::loadView('reports.financial-summary', $data);
        return $pdf->download('financial-summary-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Generate Income Statement PDF.
     *
     * @param string $startDate
     * @param string $endDate
     * @return \Illuminate\Http\Response
     */
    public function generateIncomeStatementPDF(string $startDate, string $endDate)
    {
        try {
            \Log::info("Starting income statement PDF generation", [
                'start_date' => $startDate,
                'end_date' => $endDate
            ]);
            
            $offerings = DB::table('offerings')
                ->join('offering_types', 'offerings.offering_type_id', '=', 'offering_types.id')
                ->select('offering_types.name as type', DB::raw('SUM(offerings.amount) as total'))
                ->whereBetween('offerings.date', [$startDate, $endDate])
                ->groupBy('offering_types.name')
                ->get();
            
            \Log::info("Query executed successfully", [
                'offerings_count' => $offerings->count(),
                'total' => $offerings->sum('total')
            ]);
            
            $data = [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'offerings' => $offerings,
                'total' => $offerings->sum('total'),
                'generated_at' => now()->format('Y-m-d H:i:s'),
            ];
            
            \Log::info("Loading PDF view");
            $pdf = Pdf::loadView('reports.income-statement', $data);
            
            \Log::info("PDF generated successfully, returning download response");
            return $pdf->download('income-statement-' . now()->format('Y-m-d') . '.pdf');
            
        } catch (\Exception $e) {
            \Log::error("Failed to generate income statement PDF", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'start_date' => $startDate,
                'end_date' => $endDate
            ]);
            throw $e;
        }
    }

    /**
     * Generate Expense Report PDF.
     *
     * @param string $startDate
     * @param string $endDate
     * @return \Illuminate\Http\Response
     */
    public function generateExpenseReportPDF(string $startDate, string $endDate)
    {
        $expenses = DB::table('expenses')
            ->join('expense_categories', 'expenses.expense_category_id', '=', 'expense_categories.id')
            ->leftJoin('vendors', 'expenses.vendor_id', '=', 'vendors.id')
            ->select(
                'expense_categories.name as category',
                'vendors.name as vendor',
                'expenses.description',
                'expenses.amount',
                'expenses.date',
                'expenses.approval_status'
            )
            ->whereBetween('expenses.date', [$startDate, $endDate])
            ->orderBy('expenses.date', 'desc')
            ->get();
        
        $data = [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'expenses' => $expenses,
            'total' => $expenses->where('approval_status', 'approved')->sum('amount'),
            'generated_at' => now()->format('Y-m-d H:i:s'),
        ];
        
        $pdf = Pdf::loadView('reports.expense-report', $data);
        return $pdf->download('expense-report-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Generate Budget Variance PDF.
     *
     * @param string $startDate
     * @param string $endDate
     * @return \Illuminate\Http\Response
     */
    public function generateBudgetVariancePDF(string $startDate, string $endDate)
    {
        $budgets = DB::table('budgets')
            ->where('is_active', true)
            ->where(function($query) use ($startDate, $endDate) {
                $query->whereBetween('start_date', [$startDate, $endDate])
                      ->orWhereBetween('end_date', [$startDate, $endDate])
                      ->orWhere(function($q) use ($startDate, $endDate) {
                          $q->where('start_date', '<=', $startDate)
                            ->where('end_date', '>=', $endDate);
                      });
            })
            ->get();
        
        $budgetData = [];
        foreach ($budgets as $budget) {
            $items = DB::table('budget_items')
                ->join('expense_categories', 'budget_items.category_id', '=', 'expense_categories.id')
                ->where('budget_items.budget_id', $budget->id)
                ->where('budget_items.category_type', 'expense')
                ->select(
                    'expense_categories.name as category',
                    'budget_items.budgeted_amount'
                )
                ->get()
                ->map(function($item) use ($budget) {
                    // Calculate actual amount from expenses
                    $actualAmount = DB::table('expenses')
                        ->join('expense_categories', 'expenses.expense_category_id', '=', 'expense_categories.id')
                        ->where('expense_categories.name', $item->category)
                        ->where('expenses.approval_status', 'approved')
                        ->whereBetween('expenses.date', [$budget->start_date, $budget->end_date])
                        ->sum('expenses.amount');
                    
                    $item->actual_amount = $actualAmount;
                    return $item;
                });
            
            $budgetData[] = [
                'budget' => $budget,
                'items' => $items,
            ];
        }
        
        $data = [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'budgets' => $budgetData,
            'generated_at' => now()->format('Y-m-d H:i:s'),
        ];
        
        $pdf = Pdf::loadView('reports.budget-variance', $data);
        return $pdf->download('budget-variance-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Generate Donor Giving PDF.
     *
     * @param string $startDate
     * @param string $endDate
     * @return \Illuminate\Http\Response
     */
    public function generateDonorGivingPDF(string $startDate, string $endDate)
    {
        $donations = DB::table('offerings')
            ->leftJoin('members', 'offerings.member_id', '=', 'members.id')
            ->join('offering_types', 'offerings.offering_type_id', '=', 'offering_types.id')
            ->select(
                DB::raw('CONCAT(members.first_name, " ", members.last_name) as donor_name'),
                'offerings.is_anonymous',
                'offering_types.name as type',
                'offerings.amount',
                'offerings.date'
            )
            ->whereBetween('offerings.date', [$startDate, $endDate])
            ->orderBy('offerings.date', 'desc')
            ->get();
        
        $data = [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'donations' => $donations,
            'total' => $donations->sum('amount'),
            'generated_at' => now()->format('Y-m-d H:i:s'),
        ];
        
        $pdf = Pdf::loadView('reports.donor-giving', $data);
        return $pdf->download('donor-giving-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Generate Fund Balance PDF.
     *
     * @param string $startDate
     * @param string $endDate
     * @return \Illuminate\Http\Response
     */
    public function generateFundBalancePDF(string $startDate, string $endDate)
    {
        $funds = DB::table('funds')
            ->select('name', 'fund_type', 'current_balance', 'description')
            ->get();
        
        $data = [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'funds' => $funds,
            'total_balance' => $funds->sum('current_balance'),
            'generated_at' => now()->format('Y-m-d H:i:s'),
        ];
        
        $pdf = Pdf::loadView('reports.fund-balance', $data);
        return $pdf->download('fund-balance-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Generate PDF report for demographic data.
     *
     * @return \Illuminate\Http\Response
     */
    public function generateDemographicPDF()
    {
        $reportData = $this->generateDemographicReport();
        
        $pdf = Pdf::loadView('reports.demographic', [
            'report' => $reportData,
            'generated_at' => now()->format('Y-m-d H:i:s'),
        ]);

        return $pdf->download('demographic-report-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Generate combined PDF report with both financial and demographic data.
     *
     * @param string $startDate
     * @param string $endDate
     * @return \Illuminate\Http\Response
     */
    public function generateCombinedPDF(string $startDate, string $endDate)
    {
        $financialData = $this->generateFinancialReport($startDate, $endDate);
        $demographicData = $this->generateDemographicReport();
        
        $pdf = Pdf::loadView('reports.combined', [
            'financial' => $financialData,
            'demographic' => $demographicData,
            'generated_at' => now()->format('Y-m-d H:i:s'),
        ]);

        return $pdf->download('church-report-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * Calculate giving trends from monthly totals.
     *
     * @param \Illuminate\Database\Eloquent\Collection $monthlyTotals
     * @return array
     */
    protected function calculateGivingTrends($monthlyTotals): array
    {
        if ($monthlyTotals->isEmpty()) {
            return [
                'trend' => 'stable',
                'percentage_change' => 0,
            ];
        }

        $totals = $monthlyTotals->pluck('total')->toArray();
        
        if (count($totals) < 2) {
            return [
                'trend' => 'stable',
                'percentage_change' => 0,
            ];
        }

        $firstHalf = array_slice($totals, 0, ceil(count($totals) / 2));
        $secondHalf = array_slice($totals, ceil(count($totals) / 2));

        $firstAvg = count($firstHalf) > 0 ? array_sum($firstHalf) / count($firstHalf) : 0;
        $secondAvg = count($secondHalf) > 0 ? array_sum($secondHalf) / count($secondHalf) : 0;

        $percentageChange = $firstAvg > 0 ? (($secondAvg - $firstAvg) / $firstAvg) * 100 : 0;

        $trend = 'stable';
        if ($percentageChange > 5) {
            $trend = 'increasing';
        } elseif ($percentageChange < -5) {
            $trend = 'decreasing';
        }

        return [
            'trend' => $trend,
            'percentage_change' => round($percentageChange, 2),
        ];
    }

    /**
     * Aggregate members by age groups.
     *
     * @param \Illuminate\Database\Eloquent\Collection $members
     * @return array
     */
    protected function aggregateByAge($members): array
    {
        $ageGroups = [
            '0-17' => 0,
            '18-30' => 0,
            '31-50' => 0,
            '51-70' => 0,
            '71+' => 0,
            'unknown' => 0,
        ];

        foreach ($members as $member) {
            if (!$member->birth_date) {
                $ageGroups['unknown']++;
                continue;
            }

            $age = now()->diffInYears($member->birth_date);

            if ($age <= 17) {
                $ageGroups['0-17']++;
            } elseif ($age <= 30) {
                $ageGroups['18-30']++;
            } elseif ($age <= 50) {
                $ageGroups['31-50']++;
            } elseif ($age <= 70) {
                $ageGroups['51-70']++;
            } else {
                $ageGroups['71+']++;
            }
        }

        return $ageGroups;
    }

    /**
     * Aggregate members by location (city).
     *
     * @param \Illuminate\Database\Eloquent\Collection $members
     * @return array
     */
    protected function aggregateByLocation($members): array
    {
        return $members->groupBy('city')
            ->map(function ($group) {
                return $group->count();
            })
            ->toArray();
    }

    /**
     * Aggregate members by gender.
     *
     * @param \Illuminate\Database\Eloquent\Collection $members
     * @return array
     */
    protected function aggregateByGender($members): array
    {
        return $members->groupBy('gender')
            ->map(function ($group) {
                return $group->count();
            })
            ->toArray();
    }

    /**
     * Aggregate members by status.
     *
     * @param \Illuminate\Database\Eloquent\Collection $members
     * @return array
     */
    protected function aggregateByStatus($members): array
    {
        return $members->groupBy('status')
            ->map(function ($group) {
                return $group->count();
            })
            ->toArray();
    }

    /**
     * Aggregate members by small group.
     *
     * @param \Illuminate\Database\Eloquent\Collection $members
     * @return array
     */
    protected function aggregateBySmallGroup($members): array
    {
        $withSmallGroup = $this->memberRepository->getAllWithSmallGroups();
        
        $grouped = $withSmallGroup->groupBy('small_group_id')
            ->map(function ($group) {
                $smallGroupName = $group->first()->smallGroup 
                    ? $group->first()->smallGroup->name 
                    : 'No Small Group';
                
                return [
                    'name' => $smallGroupName,
                    'count' => $group->count(),
                ];
            });

        return $grouped->values()->toArray();
    }
}
