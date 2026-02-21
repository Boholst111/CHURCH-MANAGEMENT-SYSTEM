<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankReconciliation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'account_name',
        'statement_date',
        'statement_balance',
        'reconciled_balance',
        'difference',
        'is_balanced',
        'reconciled_by',
        'reconciled_at',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'statement_date' => 'date',
        'statement_balance' => 'decimal:2',
        'reconciled_balance' => 'decimal:2',
        'difference' => 'decimal:2',
        'is_balanced' => 'boolean',
        'reconciled_at' => 'datetime',
    ];

    /**
     * Get the user who reconciled this statement.
     */
    public function reconciledBy()
    {
        return $this->belongsTo(User::class, 'reconciled_by');
    }

    /**
     * Get the reconciliation items for this reconciliation.
     */
    public function items()
    {
        return $this->hasMany(ReconciliationItem::class, 'reconciliation_id');
    }
}
