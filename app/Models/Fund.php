<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fund extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
        'description',
        'current_balance',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'current_balance' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the offerings for this fund.
     */
    public function offerings()
    {
        return $this->hasMany(Offering::class);
    }

    /**
     * Get the expenses for this fund.
     */
    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    /**
     * Get the fund transfers where this fund is the source.
     */
    public function transfersFrom()
    {
        return $this->hasMany(FundTransfer::class, 'from_fund_id');
    }

    /**
     * Get the fund transfers where this fund is the destination.
     */
    public function transfersTo()
    {
        return $this->hasMany(FundTransfer::class, 'to_fund_id');
    }
}
