<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Offering extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'member_id',
        'offering_type_id',
        'fund_id',
        'amount',
        'payment_method',
        'date',
        'notes',
        'is_anonymous',
        'receipt_number',
        'recurring_giving_id',
        'pledge_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
        'is_anonymous' => 'boolean',
    ];

    /**
     * Get the member that owns the offering.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the offering type for this offering.
     */
    public function offeringType()
    {
        return $this->belongsTo(OfferingType::class);
    }

    /**
     * Get the fund for this offering.
     */
    public function fund()
    {
        return $this->belongsTo(Fund::class);
    }

    /**
     * Get the recurring giving schedule for this offering.
     */
    public function recurringGiving()
    {
        return $this->belongsTo(RecurringGiving::class);
    }

    /**
     * Get the pledge for this offering.
     */
    public function pledge()
    {
        return $this->belongsTo(Pledge::class);
    }
}
