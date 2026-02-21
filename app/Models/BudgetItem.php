<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'budget_id',
        'category_type',
        'category_id',
        'budgeted_amount',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'budgeted_amount' => 'decimal:2',
    ];

    /**
     * Get the budget that owns this item.
     */
    public function budget()
    {
        return $this->belongsTo(Budget::class);
    }

    /**
     * Get the category for this budget item (polymorphic).
     * Returns either OfferingType (for income) or ExpenseCategory (for expense).
     */
    public function category()
    {
        if ($this->category_type === 'income') {
            return $this->belongsTo(OfferingType::class, 'category_id');
        } elseif ($this->category_type === 'expense') {
            return $this->belongsTo(ExpenseCategory::class, 'category_id');
        }
        
        return null;
    }
}
