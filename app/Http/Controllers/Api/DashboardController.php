<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Event;
use App\Services\MemberService;
use App\Services\FinanceService;
use App\Repositories\ActivityRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    protected MemberService $memberService;
    protected FinanceService $financeService;
    protected ActivityRepository $activityRepository;

    public function __construct(
        MemberService $memberService,
        FinanceService $financeService,
        ActivityRepository $activityRepository
    ) {
        $this->memberService = $memberService;
        $this->financeService = $financeService;
        $this->activityRepository = $activityRepository;
    }

    /**
     * Get dashboard quick stats
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function stats()
    {
        try {
            // Total Members (active members only)
            $totalMembers = Member::where('status', 'active')->count();

            // Monthly Tithes (current month)
            $monthlyTithes = $this->financeService->getTotalForCurrentMonth();

            // Upcoming Events (future events with status 'upcoming')
            $upcomingEvents = Event::where('status', 'upcoming')
                ->where('event_date', '>=', now()->toDateString())
                ->count();

            // New Visitors (visitors who joined this month)
            $newVisitors = $this->memberService->getNewVisitorsThisMonth()->count();

            // Finance summaries - Current month
            $totalOfferings = DB::table('offerings')
                ->whereMonth('date', now()->month)
                ->whereYear('date', now()->year)
                ->sum('amount');

            $totalExpenses = DB::table('expenses')
                ->where('approval_status', 'approved')
                ->whereMonth('date', now()->month)
                ->whereYear('date', now()->year)
                ->sum('amount');

            $netIncome = $totalOfferings - $totalExpenses;

            // Finance summaries - Last month for trend comparison
            $lastMonthOfferings = DB::table('offerings')
                ->whereMonth('date', now()->subMonth()->month)
                ->whereYear('date', now()->subMonth()->year)
                ->sum('amount');

            $lastMonthExpenses = DB::table('expenses')
                ->where('approval_status', 'approved')
                ->whereMonth('date', now()->subMonth()->month)
                ->whereYear('date', now()->subMonth()->year)
                ->sum('amount');

            $lastMonthNetIncome = $lastMonthOfferings - $lastMonthExpenses;

            // Calculate trends (percentage change)
            $offeringsTrend = $lastMonthOfferings > 0 
                ? round((($totalOfferings - $lastMonthOfferings) / $lastMonthOfferings) * 100, 1)
                : 0;

            $expensesTrend = $lastMonthExpenses > 0
                ? round((($totalExpenses - $lastMonthExpenses) / $lastMonthExpenses) * 100, 1)
                : 0;

            $netIncomeTrend = $lastMonthNetIncome != 0
                ? round((($netIncome - $lastMonthNetIncome) / abs($lastMonthNetIncome)) * 100, 1)
                : 0;

            // Budget utilization - Current year
            // Get active budgets that overlap with current year
            $totalBudget = DB::table('budget_items')
                ->join('budgets', 'budget_items.budget_id', '=', 'budgets.id')
                ->where('budgets.is_active', true)
                ->where(function ($query) {
                    $query->whereYear('budgets.start_date', '<=', now()->year)
                          ->whereYear('budgets.end_date', '>=', now()->year);
                })
                ->where('budget_items.category_type', 'expense')
                ->sum('budget_items.budgeted_amount');

            $budgetUtilization = $totalBudget > 0
                ? round(($totalExpenses / $totalBudget) * 100, 1)
                : 0;

            return response()->json([
                'success' => true,
                'data' => [
                    'total_members' => $totalMembers,
                    'monthly_tithes' => $monthlyTithes,
                    'upcoming_events' => $upcomingEvents,
                    'new_visitors' => $newVisitors,
                    'total_offerings' => $totalOfferings,
                    'total_expenses' => $totalExpenses,
                    'net_income' => $netIncome,
                    'offerings_trend' => $offeringsTrend,
                    'expenses_trend' => $expensesTrend,
                    'net_income_trend' => $netIncomeTrend,
                    'budget_utilization' => $budgetUtilization,
                    'total_budget' => $totalBudget,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard statistics',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get attendance trends for the past 12 months
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function attendance()
    {
        try {
            // Get attendance data from completed events over the past 12 months
            $attendanceData = Event::select(
                    DB::raw('YEAR(event_date) as year'),
                    DB::raw('MONTH(event_date) as month'),
                    DB::raw('SUM(attendance_count) as total_attendance'),
                    DB::raw('COUNT(*) as event_count')
                )
                ->where('status', 'completed')
                ->where('event_date', '>=', now()->subMonths(12))
                ->whereNotNull('attendance_count')
                ->groupBy('year', 'month')
                ->orderBy('year', 'asc')
                ->orderBy('month', 'asc')
                ->get()
                ->map(function ($item) {
                    return [
                        'year' => $item->year,
                        'month' => $item->month,
                        'month_name' => date('F', mktime(0, 0, 0, $item->month, 1)),
                        'total_attendance' => $item->total_attendance,
                        'event_count' => $item->event_count,
                        'average_attendance' => $item->event_count > 0 
                            ? round($item->total_attendance / $item->event_count, 2) 
                            : 0,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $attendanceData,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve attendance trends',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get recent activities for the dashboard
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function activities(Request $request)
    {
        try {
            // Get limit from request, default to 10
            $limit = $request->input('limit', 10);
            
            // Validate limit
            if ($limit < 1 || $limit > 50) {
                $limit = 10;
            }

            // Get recent activities with user information
            $activities = $this->activityRepository->getRecentForDashboard($limit);

            // Format activities for response
            $formattedActivities = $activities->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'user_name' => $activity->user ? $activity->user->name : 'Unknown User',
                    'action' => $activity->action,
                    'entity_type' => $activity->entity_type,
                    'entity_id' => $activity->entity_id,
                    'description' => $activity->description,
                    'created_at' => $activity->created_at->toISOString(),
                    'created_at_human' => $activity->created_at->diffForHumans(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $formattedActivities,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve recent activities',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get upcoming events for the dashboard
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upcomingEvents(Request $request)
    {
        try {
            // Get limit from request, default to 5
            $limit = $request->input('limit', 5);
            
            // Validate limit
            if ($limit < 1 || $limit > 20) {
                $limit = 5;
            }

            // Get upcoming events sorted by date
            $events = Event::where('status', 'upcoming')
                ->where('event_date', '>=', now()->toDateString())
                ->orderBy('event_date', 'asc')
                ->orderBy('event_time', 'asc')
                ->limit($limit)
                ->get()
                ->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title,
                        'event_date' => $event->event_date->toDateString(),
                        'event_date_formatted' => $event->event_date->format('M d, Y'),
                        'event_time' => $event->event_time,
                        'location' => $event->location,
                        'description' => $event->description,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $events,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve upcoming events',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}