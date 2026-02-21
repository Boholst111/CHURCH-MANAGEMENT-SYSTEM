<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Http\Controllers\Api\FinanceController;
use App\Services\FinanceService;
use App\Models\Tithe;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Validation\ValidationException;
use Mockery;

class FinanceControllerTest extends TestCase
{
    protected $financeService;
    protected $controller;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->financeService = Mockery::mock(FinanceService::class);
        $this->controller = new FinanceController($this->financeService);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_tithes_returns_paginated_results()
    {
        $request = Request::create('/api/finance/tithes', 'GET', [
            'per_page' => 10,
        ]);

        $tithes = collect([
            new Tithe(['id' => 1, 'amount' => 100.00, 'date' => '2024-01-01']),
            new Tithe(['id' => 2, 'amount' => 200.00, 'date' => '2024-01-02']),
        ]);

        $paginator = new LengthAwarePaginator($tithes, 2, 10, 1);

        $this->financeService
            ->shouldReceive('getPaginatedTithes')
            ->once()
            ->with(10, [], ['member'])
            ->andReturn($paginator);

        $response = $this->controller->getTithes($request);
        $data = $response->getData(true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($data['success']);
        $this->assertCount(2, $data['data']);
        $this->assertEquals(2, $data['pagination']['total']);
    }

    public function test_get_tithes_with_date_range_filter()
    {
        $request = Request::create('/api/finance/tithes', 'GET', [
            'start_date' => '2024-01-01',
            'end_date' => '2024-01-31',
        ]);

        $tithes = collect([
            new Tithe(['id' => 1, 'amount' => 100.00, 'date' => '2024-01-15']),
        ]);

        $paginator = new LengthAwarePaginator($tithes, 1, 50, 1);

        $this->financeService
            ->shouldReceive('getPaginatedTithes')
            ->once()
            ->with(50, [
                'start_date' => '2024-01-01',
                'end_date' => '2024-01-31',
            ], ['member'])
            ->andReturn($paginator);

        $response = $this->controller->getTithes($request);
        $data = $response->getData(true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($data['success']);
    }

    public function test_get_tithes_with_payment_method_filter()
    {
        $request = Request::create('/api/finance/tithes', 'GET', [
            'payment_method' => 'cash',
        ]);

        $tithes = collect([
            new Tithe(['id' => 1, 'amount' => 100.00, 'payment_method' => 'cash']),
        ]);

        $paginator = new LengthAwarePaginator($tithes, 1, 50, 1);

        $this->financeService
            ->shouldReceive('getPaginatedTithes')
            ->once()
            ->with(50, ['payment_method' => 'cash'], ['member'])
            ->andReturn($paginator);

        $response = $this->controller->getTithes($request);
        $data = $response->getData(true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($data['success']);
    }

    public function test_get_tithes_handles_validation_exception()
    {
        $request = Request::create('/api/finance/tithes', 'GET', [
            'start_date' => 'invalid-date',
            'end_date' => '2024-01-31',
        ]);

        $validator = validator(['start_date' => 'invalid-date'], ['start_date' => 'date']);
        $exception = new ValidationException($validator);

        $this->financeService
            ->shouldReceive('getPaginatedTithes')
            ->once()
            ->andThrow($exception);

        $response = $this->controller->getTithes($request);
        $data = $response->getData(true);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertFalse($data['success']);
        $this->assertEquals('Validation failed', $data['message']);
    }

    public function test_store_creates_new_tithe()
    {
        $request = Request::create('/api/finance/tithes', 'POST', [
            'member_id' => 1,
            'amount' => 150.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
            'notes' => 'Test tithe',
        ]);

        $tithe = new Tithe([
            'id' => 1,
            'member_id' => 1,
            'amount' => 150.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
            'notes' => 'Test tithe',
        ]);
        $tithe->setRelation('member', new Member());

        $this->financeService
            ->shouldReceive('recordTithe')
            ->once()
            ->andReturn($tithe);

        $response = $this->controller->store($request);
        $data = $response->getData(true);

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertTrue($data['success']);
        $this->assertEquals('Tithe recorded successfully', $data['message']);
        $this->assertEquals(150.00, $data['data']['amount']);
    }

    public function test_store_handles_validation_exception()
    {
        $request = Request::create('/api/finance/tithes', 'POST', [
            'amount' => -10.00, // Invalid amount
        ]);

        $validator = validator(['amount' => -10.00], ['amount' => 'min:0.01']);
        $exception = new ValidationException($validator);

        $this->financeService
            ->shouldReceive('recordTithe')
            ->once()
            ->andThrow($exception);

        $response = $this->controller->store($request);
        $data = $response->getData(true);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertFalse($data['success']);
        $this->assertEquals('Validation failed', $data['message']);
    }

    public function test_get_summary_returns_financial_summary()
    {
        $request = Request::create('/api/finance/summary', 'GET', [
            'start_date' => '2024-01-01',
            'end_date' => '2024-01-31',
        ]);

        $summary = [
            'total_giving' => 1500.00,
            'total_transactions' => 10,
            'average_transaction' => 150.00,
            'unique_givers' => 5,
            'by_payment_method' => [
                'cash' => ['count' => 5, 'total' => 750.00],
                'online' => ['count' => 5, 'total' => 750.00],
            ],
        ];

        $this->financeService
            ->shouldReceive('getFinancialSummary')
            ->once()
            ->with('2024-01-01', '2024-01-31')
            ->andReturn($summary);

        $response = $this->controller->getSummary($request);
        $data = $response->getData(true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($data['success']);
        $this->assertEquals(1500.00, $data['data']['total_giving']);
        $this->assertEquals('2024-01-01', $data['date_range']['start_date']);
        $this->assertEquals('2024-01-31', $data['date_range']['end_date']);
    }

    public function test_get_summary_uses_default_date_range()
    {
        $request = Request::create('/api/finance/summary', 'GET');

        $summary = [
            'total_giving' => 500.00,
            'total_transactions' => 3,
            'average_transaction' => 166.67,
            'unique_givers' => 2,
        ];

        $this->financeService
            ->shouldReceive('getFinancialSummary')
            ->once()
            ->andReturn($summary);

        $response = $this->controller->getSummary($request);
        $data = $response->getData(true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('date_range', $data);
    }

    public function test_get_summary_handles_validation_exception()
    {
        $request = Request::create('/api/finance/summary', 'GET', [
            'start_date' => '2024-01-31',
            'end_date' => '2024-01-01', // End before start
        ]);

        $validator = validator(
            ['start_date' => '2024-01-31', 'end_date' => '2024-01-01'],
            ['end_date' => 'after_or_equal:start_date']
        );
        $exception = new ValidationException($validator);

        $this->financeService
            ->shouldReceive('getFinancialSummary')
            ->once()
            ->andThrow($exception);

        $response = $this->controller->getSummary($request);
        $data = $response->getData(true);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertFalse($data['success']);
        $this->assertEquals('Validation failed', $data['message']);
    }
}
