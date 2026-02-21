<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pledge extends Model
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
        'pledged_amount',
        'start_date',
        'end_date',
        'purpose',
        'is_completed',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'pledged_amount' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the member that owns this pledge.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the offering type for this pledge.
     */
    public function offeringType()
    {
        return $this->belongsTo(OfferingType::class);
    }

    /**
     * Get the offerings (payments) associated with this pledge.
     */
    public function payments()
    {
        return $this->hasMany(Offering::class, 'pledge_id');
    }
}
