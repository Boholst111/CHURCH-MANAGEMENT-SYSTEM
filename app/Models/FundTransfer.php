<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundTransfer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'from_fund_id',
        'to_fund_id',
        'amount',
        'date',
        'reason',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
    ];

    /**
     * Get the source fund for this transfer.
     */
    public function fromFund()
    {
        return $this->belongsTo(Fund::class, 'from_fund_id');
    }

    /**
     * Get the destination fund for this transfer.
     */
    public function toFund()
    {
        return $this->belongsTo(Fund::class, 'to_fund_id');
    }

    /**
     * Get the user who created this transfer.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
