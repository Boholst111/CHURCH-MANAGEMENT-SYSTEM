<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expense extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'expense_category_id',
        'vendor_id',
        'fund_id',
        'amount',
        'date',
        'description',
        'receipt_path',
        'approval_status',
        'approved_by',
        'approved_at',
        'rejection_reason',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
        'approved_at' => 'datetime',
    ];

    /**
     * Get the category for this expense.
     */
    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
    }

    /**
     * Get the vendor for this expense.
     */
    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    /**
     * Get the fund for this expense.
     */
    public function fund()
    {
        return $this->belongsTo(Fund::class);
    }

    /**
     * Get the user who approved this expense.
     */
    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
