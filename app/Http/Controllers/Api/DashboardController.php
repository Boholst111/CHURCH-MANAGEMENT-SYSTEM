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

            // Finance summaries
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
}