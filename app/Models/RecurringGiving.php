<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecurringGiving extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'member_id',
        'offering_type_id',
        'amount',
        'frequency',
        'start_date',
        'end_date',
        'next_expected_date',
        'is_active',
        'cancellation_reason',
        'cancelled_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
        'next_expected_date' => 'date',
        'is_active' => 'boolean',
        'cancelled_at' => 'datetime',
    ];

    /**
     * Get the member that owns this recurring giving schedule.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the offering type for this recurring giving.
     */
    public function offeringType()
    {
        return $this->belongsTo(OfferingType::class);
    }

    /**
     * Get the offerings associated with this recurring giving schedule.
     */
    public function offerings()
    {
        return $this->hasMany(Offering::class);
    }
}
