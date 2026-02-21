<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Member;
use App\Models\Tithe;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class FinanceApiTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $staff;
    protected $readonly;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->staff = User::factory()->create(['role' => 'staff']);
        $this->readonly = User::factory()->create(['role' => 'readonly']);
    }

    public function test_get_tithes_requires_authentication()
    {
        $response = $this->getJson('/api/finance/tithes');
        
        $response->assertStatus(401);
    }

    public function test_get_tithes_returns_paginated_list()
    {
        Sanctum::actingAs($this->admin);
        
        $member = Member::factory()->create();
        Tithe::factory()->count(5)->create(['member_id' => $member->id]);

        $response = $this->getJson('/api/finance/tithes');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'amount', 'payment_method', 'date', 'member_id'],
                ],
                'pagination' => ['current_page', 'per_page', 'total', 'last_page'],
            ])
            ->assertJson(['success' => true]);
    }


    public function test_get_tithes_filters_by_date_range()
    {
        Sanctum::actingAs($this->admin);
        
        $member = Member::factory()->create();
        Tithe::factory()->create(['member_id' => $member->id, 'date' => '2024-01-15']);
        Tithe::factory()->create(['member_id' => $member->id, 'date' => '2024-02-15']);
        Tithe::factory()->create(['member_id' => $member->id, 'date' => '2024-03-15']);

        $response = $this->getJson('/api/finance/tithes?start_date=2024-02-01&end_date=2024-02-28');

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
        
        $this->assertCount(1, $response->json('data'));
    }

    public function test_get_tithes_filters_by_payment_method()
    {
        Sanctum::actingAs($this->admin);
        
        $member = Member::factory()->create();
        Tithe::factory()->create(['member_id' => $member->id, 'payment_method' => 'cash']);
        Tithe::factory()->create(['member_id' => $member->id, 'payment_method' => 'online']);
        Tithe::factory()->create(['member_id' => $member->id, 'payment_method' => 'cash']);

        $response = $this->getJson('/api/finance/tithes?payment_method=cash');

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
        
        $this->assertCount(2, $response->json('data'));
    }

    public function test_get_tithes_filters_by_member()
    {
        Sanctum::actingAs($this->admin);
        
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();
        Tithe::factory()->count(3)->create(['member_id' => $member1->id]);
        Tithe::factory()->count(2)->create(['member_id' => $member2->id]);

        $response = $this->getJson("/api/finance/tithes?member_id={$member1->id}");

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
        
        $this->assertCount(3, $response->json('data'));
    }

    public function test_store_tithe_requires_authentication()
    {
        $response = $this->postJson('/api/finance/tithes', [
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);
        
        $response->assertStatus(401);
    }

    public function test_store_tithe_requires_admin_or_staff_role()
    {
        Sanctum::actingAs($this->readonly);
        
        $response = $this->postJson('/api/finance/tithes', [
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);
        
        $response->assertStatus(403);
    }

    public function test_admin_can_store_tithe()
    {
        Sanctum::actingAs($this->admin);
        
        $member = Member::factory()->create();

        $response = $this->postJson('/api/finance/tithes', [
            'member_id' => $member->id,
            'amount' => 150.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
            'notes' => 'Test tithe',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Tithe recorded successfully',
            ])
            ->assertJsonStructure([
                'data' => ['id', 'amount', 'payment_method', 'date', 'member_id'],
            ]);

        $this->assertDatabaseHas('tithes', [
            'member_id' => $member->id,
            'amount' => 150.00,
            'payment_method' => 'cash',
        ]);
    }

    public function test_staff_can_store_tithe()
    {
        Sanctum::actingAs($this->staff);
        
        $member = Member::factory()->create();

        $response = $this->postJson('/api/finance/tithes', [
            'member_id' => $member->id,
            'amount' => 200.00,
            'payment_method' => 'online',
            'date' => '2024-01-20',
        ]);

        $response->assertStatus(201)
            ->assertJson(['success' => true]);
    }

    public function test_store_tithe_validates_required_fields()
    {
        Sanctum::actingAs($this->admin);

        $response = $this->postJson('/api/finance/tithes', []);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation failed',
            ])
            ->assertJsonValidationErrors(['amount', 'payment_method', 'date']);
    }

    public function test_store_tithe_validates_amount_minimum()
    {
        Sanctum::actingAs($this->admin);

        $response = $this->postJson('/api/finance/tithes', [
            'amount' => 0,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['amount']);
    }

    public function test_store_tithe_validates_payment_method()
    {
        Sanctum::actingAs($this->admin);

        $response = $this->postJson('/api/finance/tithes', [
            'amount' => 100.00,
            'payment_method' => 'invalid',
            'date' => '2024-01-15',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['payment_method']);
    }

    public function test_store_tithe_validates_member_exists()
    {
        Sanctum::actingAs($this->admin);

        $response = $this->postJson('/api/finance/tithes', [
            'member_id' => 99999,
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['member_id']);
    }

    public function test_get_summary_requires_authentication()
    {
        $response = $this->getJson('/api/finance/summary');
        
        $response->assertStatus(401);
    }

    public function test_get_summary_returns_financial_data()
    {
        Sanctum::actingAs($this->admin);
        
        $member = Member::factory()->create();
        Tithe::factory()->count(5)->create([
            'member_id' => $member->id,
            'amount' => 100.00,
            'date' => now()->format('Y-m-d'),
        ]);

        $response = $this->getJson('/api/finance/summary');

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'data' => [
                    'total_giving',
                    'total_transactions',
                    'average_transaction',
                    'unique_givers',
                    'by_payment_method',
                ],
                'date_range' => ['start_date', 'end_date'],
            ]);
    }

    public function test_get_summary_filters_by_date_range()
    {
        Sanctum::actingAs($this->admin);
        
        $member = Member::factory()->create();
        Tithe::factory()->create(['member_id' => $member->id, 'amount' => 100.00, 'date' => '2024-01-15']);
        Tithe::factory()->create(['member_id' => $member->id, 'amount' => 200.00, 'date' => '2024-02-15']);

        $response = $this->getJson('/api/finance/summary?start_date=2024-01-01&end_date=2024-01-31');

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
        
        $this->assertEquals(100.00, $response->json('data.total_giving'));
    }

    public function test_get_summary_validates_date_range()
    {
        Sanctum::actingAs($this->admin);

        $response = $this->getJson('/api/finance/summary?start_date=2024-01-31&end_date=2024-01-01');

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation failed',
            ]);
    }

    public function test_get_summary_includes_payment_method_breakdown()
    {
        Sanctum::actingAs($this->admin);
        
        $member = Member::factory()->create();
        Tithe::factory()->create(['member_id' => $member->id, 'amount' => 100.00, 'payment_method' => 'cash', 'date' => now()]);
        Tithe::factory()->create(['member_id' => $member->id, 'amount' => 200.00, 'payment_method' => 'online', 'date' => now()]);

        $response = $this->getJson('/api/finance/summary');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'by_payment_method' => ['cash', 'online'],
                ],
            ]);
    }
}
