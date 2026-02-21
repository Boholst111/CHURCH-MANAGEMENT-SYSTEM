<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceiptLog extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     * Only created_at is used for receipt logs.
     *
     * @var bool
     */
    const UPDATED_AT = null;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'offering_id',
        'receipt_number',
        'generated_by',
        'generated_at',
        'receipt_type',
        'file_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'generated_at' => 'datetime',
    ];

    /**
     * Get the offering for this receipt.
     */
    public function offering()
    {
        return $this->belongsTo(Offering::class);
    }

    /**
     * Get the user who generated this receipt.
     */
    public function generatedBy()
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
