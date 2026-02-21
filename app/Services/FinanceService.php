<?php

namespace App\Services;

use App\Models\Tithe;
use App\Repositories\FinanceRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FinanceService
{
    protected FinanceRepository $financeRepository;

    public function __construct(FinanceRepository $financeRepository)
    {
        $this->financeRepository = $financeRepository;
    }

    /**
     * Get all tithes with optional eager loading.
     *
     * @param array $relations
     * @return Collection
     */
    public function getAllTithes(array $relations = []): Collection
    {
        return $this->financeRepository->all($relations);
    }

    /**
     * Get a tithe by ID.
     *
     * @param int $id
     * @param array $relations
     * @return Tithe|null
     */
    public function getTitheById(int $id, array $relations = []): ?Tithe
    {
        return $this->financeRepository->find($id, $relations);
    }

    /**
     * Record a new tithe with validation.
     *
     * @param array $data
     * @return Tithe
     * @throws ValidationException
     */
    public function recordTithe(array $data): Tithe
    {
        $this->validateTitheData($data);
        
        return $this->financeRepository->create($data);
    }

    /**
     * Update a tithe with validation.
     *
     * @param int $id
     * @param array $data
     * @return Tithe
     * @throws ValidationException
     * @throws \Exception
     */
    public function updateTithe(int $id, array $data): Tithe
    {
        $tithe = $this->financeRepository->find($id);
        
        if (!$tithe) {
            throw new \Exception("Tithe not found with ID: {$id}");
        }

        $this->validateTitheData($data);
        
        $this->financeRepository->update($id, $data);
        
        return $this->financeRepository->find($id);
    }

    /**
     * Delete a tithe.
     *
     * @param int $id
     * @return bool
     * @throws \Exception
     */
    public function deleteTithe(int $id): bool
    {
        $tithe = $this->financeRepository->find($id);
        
        if (!$tithe) {
            throw new \Exception("Tithe not found with ID: {$id}");
        }

        return $this->financeRepository->delete($id);
    }

    /**
     * Get tithes within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @param array $relations
     * @return Collection
     * @throws ValidationException
     */
    public function getTithesByDateRange(string $startDate, string $endDate, array $relations = []): Collection
    {
        $this->validateDateRange($startDate, $endDate);
        
        return $this->financeRepository->getByDateRange($startDate, $endDate, $relations);
    }

    /**
     * Get paginated tithes with filters.
     *
     * @param int $perPage
     * @param array $filters
     * @param array $relations
     * @return LengthAwarePaginator
     * @throws ValidationException
     */
    public function getPaginatedTithes(int $perPage = 50, array $filters = [], array $relations = []): LengthAwarePaginator
    {
        // Validate date range if provided
        if (isset($filters['start_date']) && isset($filters['end_date'])) {
            $this->validateDateRange($filters['start_date'], $filters['end_date']);
        }

        // Validate payment method if provided
        if (isset($filters['payment_method']) && !empty($filters['payment_method'])) {
            $this->validatePaymentMethod($filters['payment_method']);
        }

        return $this->financeRepository->paginate($perPage, $filters, $relations);
    }

    /**
     * Calculate total giving for the current month.
     *
     * @return float
     */
    public function getTotalForCurrentMonth(): float
    {
        return $this->financeRepository->getTotalForCurrentMonth();
    }

    /**
     * Calculate total giving within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return float
     * @throws ValidationException
     */
    public function calculateTotalGiving(string $startDate, string $endDate): float
    {
        $this->validateDateRange($startDate, $endDate);
        
        return $this->financeRepository->getTotalByDateRange($startDate, $endDate);
    }

    /**
     * Calculate average giving per member within a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return float
     * @throws ValidationException
     */
    public function calculateAveragePerMember(string $startDate, string $endDate): float
    {
        $this->validateDateRange($startDate, $endDate);
        
        return $this->financeRepository->getAveragePerMember($startDate, $endDate);
    }

    /**
     * Get monthly giving totals for trend analysis.
     *
     * @param int $months
     * @return Collection
     */
    public function getMonthlyTrends(int $months = 12): Collection
    {
        if ($months < 1) {
            $months = 12;
        }

        return $this->financeRepository->getMonthlyTotals($months);
    }

    /**
     * Get comprehensive financial summary for a date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return array
     * @throws ValidationException
     */
    public function getFinancialSummary(string $startDate, string $endDate): array
    {
        $this->validateDateRange($startDate, $endDate);
        
        return $this->financeRepository->getSummary($startDate, $endDate);
    }

    /**
     * Search tithes by member name or notes.
     *
     * @param string $query
     * @param array $relations
     * @return Collection
     */
    public function searchTithes(string $query, array $relations = []): Collection
    {
        if (empty(trim($query))) {
            return $this->financeRepository->all($relations);
        }

        return $this->financeRepository->search($query, $relations);
    }

    /**
     * Filter tithes by payment method.
     *
     * @param string $paymentMethod
     * @param array $relations
     * @return Collection
     * @throws ValidationException
     */
    public function filterByPaymentMethod(string $paymentMethod, array $relations = []): Collection
    {
        $this->validatePaymentMethod($paymentMethod);
        
        return $this->financeRepository->filterByPaymentMethod($paymentMethod, $relations);
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
        return $this->financeRepository->filterByMember($memberId, $relations);
    }

    /**
     * Validate tithe data.
     *
     * @param array $data
     * @return void
     * @throws ValidationException
     */
    protected function validateTitheData(array $data): void
    {
        $validator = Validator::make($data, Tithe::validationRules());

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Validate date range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return void
     * @throws ValidationException
     */
    protected function validateDateRange(string $startDate, string $endDate): void
    {
        $validator = Validator::make(
            [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            [
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
            ]
        );

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Validate payment method.
     *
     * @param string $paymentMethod
     * @return void
     * @throws ValidationException
     */
    protected function validatePaymentMethod(string $paymentMethod): void
    {
        $validator = Validator::make(
            ['payment_method' => $paymentMethod],
            ['payment_method' => 'required|in:cash,check,online,other']
        );

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
