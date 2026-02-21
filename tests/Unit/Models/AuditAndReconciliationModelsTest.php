<?php

namespace Tests\Unit\Models;

use App\Models\AuditLog;
use App\Models\BankReconciliation;
use App\Models\ReconciliationItem;
use App\Models\ReceiptLog;
use App\Models\FundTransfer;
use App\Models\Fund;
use App\Models\User;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuditAndReconciliationModelsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function audit_log_can_be_created()
    {
        $user = User::factory()->create();

        $auditLog = AuditLog::create([
            'user_id' => $user->id,
            'action' => 'create',
            'model_type' => 'App\Models\Offering',
            'model_id' => 1,
            'new_values' => ['amount' => 100.00],
            'ip_address' => '127.0.0.1',
            'created_at' => now(),
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'create',
            'model_type' => 'App\Models\Offering',
        ]);
    }

    /** @test */
    public function audit_log_belongs_to_user()
    {
        $user = User::factory()->create();

        $auditLog = AuditLog::create([
            'user_id' => $user->id,
            'action' => 'update',
            'model_type' => 'App\Models\Expense',
            'model_id' => 1,
            'created_at' => now(),
        ]);

        $this->assertInstanceOf(User::class, $auditLog->user);
        $this->assertEquals($user->id, $auditLog->user->id);
    }

    /** @test */
    public function bank_reconciliation_can_be_created()
    {
        $reconciliation = BankReconciliation::create([
            'account_name' => 'Main Checking',
            'statement_date' => '2024-01-31',
            'statement_balance' => 5000.00,
            'reconciled_balance' => 0.00,
            'difference' => 0.00,
            'is_balanced' => false,
        ]);

        $this->assertDatabaseHas('bank_reconciliations', [
            'account_name' => 'Main Checking',
            'statement_balance' => 5000.00,
        ]);
    }

    /** @test */
    public function bank_reconciliation_belongs_to_user()
    {
        $user = User::factory()->create();

        $reconciliation = BankReconciliation::create([
            'account_name' => 'Savings Account',
            'statement_date' => '2024-01-31',
            'statement_balance' => 10000.00,
            'reconciled_by' => $user->id,
            'reconciled_at' => now(),
        ]);

        $this->assertInstanceOf(User::class, $reconciliation->reconciledBy);
        $this->assertEquals($user->id, $reconciliation->reconciledBy->id);
    }

    /** @test */
    public function bank_reconciliation_has_many_items()
    {
        $reconciliation = BankReconciliation::create([
            'account_name' => 'Main Checking',
            'statement_date' => '2024-01-31',
            'statement_balance' => 5000.00,
        ]);

        ReconciliationItem::create([
            'reconciliation_id' => $reconciliation->id,
            'transaction_type' => 'offering',
            'transaction_id' => 1,
        ]);

        ReconciliationItem::create([
            'reconciliation_id' => $reconciliation->id,
            'transaction_type' => 'expense',
            'transaction_id' => 1,
        ]);

        $this->assertCount(2, $reconciliation->items);
    }

    /** @test */
    public function reconciliation_item_belongs_to_reconciliation()
    {
        $reconciliation = BankReconciliation::create([
            'account_name' => 'Main Checking',
            'statement_date' => '2024-01-31',
            'statement_balance' => 5000.00,
        ]);

        $item = ReconciliationItem::create([
            'reconciliation_id' => $reconciliation->id,
            'transaction_type' => 'offering',
            'transaction_id' => 1,
        ]);

        $this->assertInstanceOf(BankReconciliation::class, $item->reconciliation);
        $this->assertEquals($reconciliation->id, $item->reconciliation->id);
    }

    /** @test */
    public function receipt_log_can_be_created()
    {
        $user = User::factory()->create();
        $offeringType = OfferingType::firstOrCreate(['name' => 'Tithe'], ['is_active' => true]);
        $offering = Offering::create([
            'offering_type_id' => $offeringType->id,
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);

        $receiptLog = ReceiptLog::create([
            'offering_id' => $offering->id,
            'receipt_number' => 'RCP-2024-001',
            'generated_by' => $user->id,
            'generated_at' => now(),
            'receipt_type' => 'single',
        ]);

        $this->assertDatabaseHas('receipt_logs', [
            'offering_id' => $offering->id,
            'receipt_number' => 'RCP-2024-001',
        ]);
    }

    /** @test */
    public function receipt_log_belongs_to_offering()
    {
        $user = User::factory()->create();
        $offeringType = OfferingType::firstOrCreate(['name' => 'Tithe'], ['is_active' => true]);
        $offering = Offering::create([
            'offering_type_id' => $offeringType->id,
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);

        $receiptLog = ReceiptLog::create([
            'offering_id' => $offering->id,
            'receipt_number' => 'RCP-2024-002',
            'generated_by' => $user->id,
            'generated_at' => now(),
            'receipt_type' => 'single',
        ]);

        $this->assertInstanceOf(Offering::class, $receiptLog->offering);
        $this->assertEquals($offering->id, $receiptLog->offering->id);
    }

    /** @test */
    public function receipt_log_belongs_to_user()
    {
        $user = User::factory()->create();
        $offeringType = OfferingType::firstOrCreate(['name' => 'Tithe'], ['is_active' => true]);
        $offering = Offering::create([
            'offering_type_id' => $offeringType->id,
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);

        $receiptLog = ReceiptLog::create([
            'offering_id' => $offering->id,
            'receipt_number' => 'RCP-2024-003',
            'generated_by' => $user->id,
            'generated_at' => now(),
            'receipt_type' => 'single',
        ]);

        $this->assertInstanceOf(User::class, $receiptLog->generatedBy);
        $this->assertEquals($user->id, $receiptLog->generatedBy->id);
    }

    /** @test */
    public function fund_transfer_can_be_created()
    {
        $user = User::factory()->create();
        $fromFund = Fund::firstOrCreate(
            ['name' => 'General Fund'],
            ['type' => 'unrestricted', 'current_balance' => 10000.00, 'is_active' => true]
        );
        $toFund = Fund::firstOrCreate(
            ['name' => 'Building Fund'],
            ['type' => 'restricted', 'current_balance' => 5000.00, 'is_active' => true]
        );

        $transfer = FundTransfer::create([
            'from_fund_id' => $fromFund->id,
            'to_fund_id' => $toFund->id,
            'amount' => 1000.00,
            'date' => '2024-01-15',
            'reason' => 'Building project allocation',
            'created_by' => $user->id,
        ]);

        $this->assertDatabaseHas('fund_transfers', [
            'from_fund_id' => $fromFund->id,
            'to_fund_id' => $toFund->id,
            'amount' => 1000.00,
        ]);
    }

    /** @test */
    public function fund_transfer_belongs_to_from_fund()
    {
        $user = User::factory()->create();
        $fromFund = Fund::firstOrCreate(
            ['name' => 'General Fund'],
            ['type' => 'unrestricted', 'current_balance' => 10000.00, 'is_active' => true]
        );
        $toFund = Fund::firstOrCreate(
            ['name' => 'Missions Fund'],
            ['type' => 'restricted', 'current_balance' => 3000.00, 'is_active' => true]
        );

        $transfer = FundTransfer::create([
            'from_fund_id' => $fromFund->id,
            'to_fund_id' => $toFund->id,
            'amount' => 500.00,
            'date' => '2024-01-15',
            'reason' => 'Missions support',
            'created_by' => $user->id,
        ]);

        $this->assertInstanceOf(Fund::class, $transfer->fromFund);
        $this->assertEquals('General Fund', $transfer->fromFund->name);
    }

    /** @test */
    public function fund_transfer_belongs_to_to_fund()
    {
        $user = User::factory()->create();
        $fromFund = Fund::firstOrCreate(
            ['name' => 'General Fund'],
            ['type' => 'unrestricted', 'current_balance' => 10000.00, 'is_active' => true]
        );
        $toFund = Fund::firstOrCreate(
            ['name' => 'Youth Fund'],
            ['type' => 'restricted', 'current_balance' => 2000.00, 'is_active' => true]
        );

        $transfer = FundTransfer::create([
            'from_fund_id' => $fromFund->id,
            'to_fund_id' => $toFund->id,
            'amount' => 750.00,
            'date' => '2024-01-15',
            'reason' => 'Youth program funding',
            'created_by' => $user->id,
        ]);

        $this->assertInstanceOf(Fund::class, $transfer->toFund);
        $this->assertEquals('Youth Fund', $transfer->toFund->name);
    }

    /** @test */
    public function fund_transfer_belongs_to_user()
    {
        $user = User::factory()->create();
        $fromFund = Fund::firstOrCreate(
            ['name' => 'General Fund'],
            ['type' => 'unrestricted', 'current_balance' => 10000.00, 'is_active' => true]
        );
        $toFund = Fund::firstOrCreate(
            ['name' => 'Benevolence Fund'],
            ['type' => 'restricted', 'current_balance' => 1000.00, 'is_active' => true]
        );

        $transfer = FundTransfer::create([
            'from_fund_id' => $fromFund->id,
            'to_fund_id' => $toFund->id,
            'amount' => 250.00,
            'date' => '2024-01-15',
            'reason' => 'Benevolence support',
            'created_by' => $user->id,
        ]);

        $this->assertInstanceOf(User::class, $transfer->createdBy);
        $this->assertEquals($user->id, $transfer->createdBy->id);
    }
}
