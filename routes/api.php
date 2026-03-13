<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArchiveController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\SettingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public config endpoint (no auth required)
Route::get('/config', function () {
    try {
        $appUrl = config('app.url', 'http://localhost:8000');
        
        return response()->json([
            'apiBaseUrl' => rtrim($appUrl, '/') . '/api',
            'appUrl' => rtrim($appUrl, '/'),
            'routes' => [
                'auth' => [
                    'login' => '/auth/login',
                    'register' => '/auth/register',
                    'logout' => '/logout',
                ],
                'user' => [
                    'profile' => '/profile',
                    'me' => '/user',
                ],
                'members' => '/members',
                'leadership' => '/leadership',
                'smallGroups' => '/small-groups',
                'finance' => '/finance',
                'events' => '/events',
                'reports' => '/reports',
                'settings' => '/settings',
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'apiBaseUrl' => 'http://localhost:8000/api',
            'appUrl' => 'http://localhost:8000',
            'error' => $e->getMessage(),
            'routes' => [
                'auth' => [
                    'login' => '/auth/login',
                    'register' => '/auth/register',
                    'logout' => '/logout',
                ],
                'user' => [
                    'profile' => '/profile',
                    'me' => '/user',
                ],
                'members' => '/members',
                'leadership' => '/leadership',
                'smallGroups' => '/small-groups',
                'finance' => '/finance',
                'events' => '/events',
                'reports' => '/reports',
                'settings' => '/settings',
            ]
        ]);
    }
});

// Authentication Routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Public routes (no auth required) - GET only
// None currently needed for church management system

// Protected Routes
Route::middleware(['auth:sanctum', 'log.activity'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile'])->middleware('role:admin,staff');
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Dashboard Routes
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/attendance', [DashboardController::class, 'attendance']);
    Route::get('/dashboard/activities', [DashboardController::class, 'activities']);
    Route::get('/dashboard/upcoming-events', [DashboardController::class, 'upcomingEvents']);
    
    // Member Routes
    Route::get('/members', [MemberController::class, 'index']);
    Route::get('/members/export', [MemberController::class, 'export']); // Must be before {id} route
    Route::post('/members', [MemberController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/members/{id}', [MemberController::class, 'show']);
    Route::put('/members/{id}', [MemberController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/members/{id}', [MemberController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Leadership Routes
    Route::get('/leadership', [\App\Http\Controllers\Api\LeadershipController::class, 'index']);
    Route::post('/leadership', [\App\Http\Controllers\Api\LeadershipController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/leadership/{id}', [\App\Http\Controllers\Api\LeadershipController::class, 'show']);
    Route::put('/leadership/{id}', [\App\Http\Controllers\Api\LeadershipController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/leadership/{id}', [\App\Http\Controllers\Api\LeadershipController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Small Group Routes
    Route::get('/small-groups', [\App\Http\Controllers\Api\SmallGroupController::class, 'index']);
    Route::post('/small-groups', [\App\Http\Controllers\Api\SmallGroupController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/small-groups/{id}', [\App\Http\Controllers\Api\SmallGroupController::class, 'show']);
    Route::get('/small-groups/{id}/members', [\App\Http\Controllers\Api\SmallGroupController::class, 'members']);
    Route::put('/small-groups/{id}', [\App\Http\Controllers\Api\SmallGroupController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/small-groups/{id}', [\App\Http\Controllers\Api\SmallGroupController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Finance Routes
    Route::get('/finance/tithes', [\App\Http\Controllers\Api\FinanceController::class, 'getTithes']);
    Route::post('/finance/tithes', [\App\Http\Controllers\Api\FinanceController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/finance/summary', [\App\Http\Controllers\Api\FinanceController::class, 'getSummary']);
    
    // Offerings Routes
    Route::get('/offerings', [\App\Http\Controllers\Api\OfferingController::class, 'index']);
    Route::post('/offerings', [\App\Http\Controllers\Api\OfferingController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/offerings/{id}', [\App\Http\Controllers\Api\OfferingController::class, 'show']);
    Route::put('/offerings/{id}', [\App\Http\Controllers\Api\OfferingController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/offerings/{id}', [\App\Http\Controllers\Api\OfferingController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Expenses Routes
    Route::get('/expenses', [\App\Http\Controllers\Api\ExpenseController::class, 'index']);
    Route::post('/expenses', [\App\Http\Controllers\Api\ExpenseController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/expenses/{id}', [\App\Http\Controllers\Api\ExpenseController::class, 'show']);
    Route::put('/expenses/{id}', [\App\Http\Controllers\Api\ExpenseController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/expenses/{id}', [\App\Http\Controllers\Api\ExpenseController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Budgets Routes
    Route::get('/budgets', [\App\Http\Controllers\Api\BudgetController::class, 'index']);
    Route::post('/budgets', [\App\Http\Controllers\Api\BudgetController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/budgets/{id}', [\App\Http\Controllers\Api\BudgetController::class, 'show']);
    Route::get('/budgets/{id}/items', [\App\Http\Controllers\Api\BudgetController::class, 'items']);
    Route::put('/budgets/{id}', [\App\Http\Controllers\Api\BudgetController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/budgets/{id}', [\App\Http\Controllers\Api\BudgetController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Offering Types Routes
    Route::get('/offering-types', [\App\Http\Controllers\Api\OfferingTypeController::class, 'index']);
    Route::post('/offering-types', [\App\Http\Controllers\Api\OfferingTypeController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/offering-types/{id}', [\App\Http\Controllers\Api\OfferingTypeController::class, 'show']);
    Route::put('/offering-types/{id}', [\App\Http\Controllers\Api\OfferingTypeController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/offering-types/{id}', [\App\Http\Controllers\Api\OfferingTypeController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Expense Categories Routes
    Route::get('/expense-categories', [\App\Http\Controllers\Api\ExpenseCategoryController::class, 'index']);
    Route::post('/expense-categories', [\App\Http\Controllers\Api\ExpenseCategoryController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/expense-categories/{id}', [\App\Http\Controllers\Api\ExpenseCategoryController::class, 'show']);
    Route::put('/expense-categories/{id}', [\App\Http\Controllers\Api\ExpenseCategoryController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/expense-categories/{id}', [\App\Http\Controllers\Api\ExpenseCategoryController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Vendors Routes
    Route::get('/vendors', [\App\Http\Controllers\Api\VendorController::class, 'index']);
    Route::post('/vendors', [\App\Http\Controllers\Api\VendorController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/vendors/{id}', [\App\Http\Controllers\Api\VendorController::class, 'show']);
    Route::put('/vendors/{id}', [\App\Http\Controllers\Api\VendorController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/vendors/{id}', [\App\Http\Controllers\Api\VendorController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Funds Routes
    Route::get('/funds', [\App\Http\Controllers\Api\FundController::class, 'index']);
    Route::post('/funds', [\App\Http\Controllers\Api\FundController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/funds/{id}', [\App\Http\Controllers\Api\FundController::class, 'show']);
    Route::put('/funds/{id}', [\App\Http\Controllers\Api\FundController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/funds/{id}', [\App\Http\Controllers\Api\FundController::class, 'destroy'])->middleware('role:admin,staff');
    
    // Event Routes
    Route::get('/events', [\App\Http\Controllers\Api\EventController::class, 'index']);
    Route::post('/events', [\App\Http\Controllers\Api\EventController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/events/{id}', [\App\Http\Controllers\Api\EventController::class, 'show']);
    Route::put('/events/{id}', [\App\Http\Controllers\Api\EventController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/events/{id}', [\App\Http\Controllers\Api\EventController::class, 'destroy'])->middleware('role:admin,staff');
    Route::put('/events/{id}/complete', [\App\Http\Controllers\Api\EventController::class, 'complete'])->middleware('role:admin,staff');
    
    // Report Routes
    Route::get('/reports/financial', [\App\Http\Controllers\Api\ReportController::class, 'getFinancialReport']);
    Route::get('/reports/demographics', [\App\Http\Controllers\Api\ReportController::class, 'getDemographicReport']);
    Route::post('/reports/export-pdf', [\App\Http\Controllers\Api\ReportController::class, 'exportPdf']);
    Route::get('/reports/quick-statistics', [\App\Http\Controllers\Api\ReportController::class, 'getQuickStatistics']);
    Route::get('/reports/{reportType}', [\App\Http\Controllers\Api\ReportController::class, 'generateReport']);
    
    // Settings Routes
    Route::get('/settings/church', [SettingsController::class, 'getChurchSettings']);
    Route::put('/settings/church', [SettingsController::class, 'updateChurchSettings'])->middleware('role:admin,staff');
    Route::get('/settings/notifications', [SettingsController::class, 'getNotificationPreferences']);
    Route::put('/settings/notifications', [SettingsController::class, 'updateNotificationPreferences']);
    
    // User Invitation Routes (admin only) - Must be before generic user routes
    Route::post('/users/invite', [\App\Http\Controllers\Api\UserController::class, 'invite'])->middleware('role:admin');
    Route::get('/users/invitations', [\App\Http\Controllers\Api\UserController::class, 'getInvitations'])->middleware('role:admin');
    Route::post('/users/invitations/{id}/resend', [\App\Http\Controllers\Api\UserController::class, 'resendInvitation'])->middleware('role:admin');
    Route::delete('/users/invitations/{id}', [\App\Http\Controllers\Api\UserController::class, 'cancelInvitation'])->middleware('role:admin');
    
    // User Management Routes (admin only)
    Route::get('/users', [\App\Http\Controllers\Api\UserController::class, 'index'])->middleware('role:admin');
    Route::post('/users', [\App\Http\Controllers\Api\UserController::class, 'store'])->middleware('role:admin');
    Route::get('/users/{id}', [\App\Http\Controllers\Api\UserController::class, 'show'])->middleware('role:admin');
    Route::put('/users/{id}', [\App\Http\Controllers\Api\UserController::class, 'update'])->middleware('role:admin');
    Route::delete('/users/{id}', [\App\Http\Controllers\Api\UserController::class, 'destroy'])->middleware('role:admin');
    
    // Activity Log Routes (admin only)
    Route::get('/activities', [\App\Http\Controllers\Api\ActivityController::class, 'index'])->middleware('role:admin');
    Route::get('/activities/users', [\App\Http\Controllers\Api\ActivityController::class, 'getUsers'])->middleware('role:admin');
    
    // Archive Management Routes (admin only)
    Route::get('/archives', [ArchiveController::class, 'index'])->middleware('role:admin');
    Route::get('/archives/{type}', [ArchiveController::class, 'indexByType'])->middleware('role:admin');
    Route::post('/archives/{type}/{id}/restore', [ArchiveController::class, 'restore'])->middleware('role:admin');
    Route::delete('/archives/{type}/{id}/force', [ArchiveController::class, 'forceDelete'])->middleware('role:admin');
    
    // Feature Flag Admin Routes (admin only)
    Route::get('/feature-flags/admin', [\App\Http\Controllers\Api\FeatureFlagAdminController::class, 'index'])->middleware('role:admin');
    Route::put('/feature-flags/admin', [\App\Http\Controllers\Api\FeatureFlagAdminController::class, 'update'])->middleware('role:admin');
    Route::get('/feature-flags/admin/users', [\App\Http\Controllers\Api\FeatureFlagAdminController::class, 'users'])->middleware('role:admin');
    
    // Deployment Metrics Routes (admin only)
    Route::get('/admin/deployment-metrics', [\App\Http\Controllers\Api\DeploymentMetricsController::class, 'index'])->middleware('role:admin');
    
    // Beta Feedback Routes
    Route::post('/beta-feedback', [\App\Http\Controllers\Api\BetaFeedbackController::class, 'store']);
    Route::get('/beta-feedback', [\App\Http\Controllers\Api\BetaFeedbackController::class, 'index'])->middleware('role:admin');
    Route::get('/beta-feedback/stats', [\App\Http\Controllers\Api\BetaFeedbackController::class, 'stats'])->middleware('role:admin');
    Route::get('/beta-feedback/{id}', [\App\Http\Controllers\Api\BetaFeedbackController::class, 'show'])->middleware('role:admin');
    Route::put('/beta-feedback/{id}', [\App\Http\Controllers\Api\BetaFeedbackController::class, 'update'])->middleware('role:admin');
});
