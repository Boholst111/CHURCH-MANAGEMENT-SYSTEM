<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tithe extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'member_id',
        'amount',
        'payment_method',
        'date',
        'notes',
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
     * Validation rules for tithe data.
     *
     * @return array<string, mixed>
     */
    public static function validationRules()
    {
        return [
            'member_id' => 'nullable|exists:members,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,check,online,other',
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get the member that owns the tithe.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
