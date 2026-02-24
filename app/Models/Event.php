<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'event_date',
        'event_time',
        'location',
        'status',
        'attendance_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'event_date' => 'date',
        'attendance_count' => 'integer',
    ];

    /**
     * Validation rules for event data.
     *
     * @return array<string, mixed>
     */
    public static function validationRules()
    {
        return [
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'event_date' => 'required|date',
            'event_time' => 'required|string',
            'location' => 'required|string|max:200',
            'status' => 'required|in:upcoming,completed,cancelled',
            'attendance_count' => 'nullable|integer|min:0',
        ];
    }
}
