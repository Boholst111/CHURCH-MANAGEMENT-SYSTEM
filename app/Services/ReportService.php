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
