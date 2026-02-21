<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'action',
        'entity_type',
        'entity_id',
        'description',
        'ip_address',
        'created_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * Validation rules for activity data.
     *
     * @return array<string, mixed>
     */
    public static function validationRules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'action' => 'required|string|max:50',
            'entity_type' => 'required|string|max:50',
            'entity_id' => 'nullable|integer',
            'description' => 'required|string|max:500',
            'ip_address' => 'nullable|string',
        ];
    }

    /**
     * Get the user that owns the activity.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
