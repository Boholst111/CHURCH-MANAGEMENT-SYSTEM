<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReconciliationItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reconciliation_id',
        'transaction_type',
        'transaction_id',
    ];

    /**
     * Get the bank reconciliation for this item.
     */
    public function reconciliation()
    {
        return $this->belongsTo(BankReconciliation::class, 'reconciliation_id');
    }

    /**
     * Get the transaction (offering or expense) for this item.
     */
    public function transaction()
    {
        return $this->morphTo('transaction');
    }

    /**
     * Get the offering if this is an offering transaction.
     */
    public function offering()
    {
        return $this->belongsTo(Offering::class, 'transaction_id')
            ->where('transaction_type', 'offering');
    }

    /**
     * Get the expense if this is an expense transaction.
     */
    public function expense()
    {
        return $this->belongsTo(Expense::class, 'transaction_id')
            ->where('transaction_type', 'expense');
    }
}
