<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Leadership extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'leadership';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'role',
        'department',
        'email',
        'phone',
        'photo_url',
        'bio',
        'start_date',
        'ministry_teams',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
    ];

    /**
     * Validation rules for leadership data.
     *
     * @return array<string, mixed>
     */
    public static function validationRules()
    {
        return [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'role' => 'required|string|max:100',
            'department' => 'required|string|max:100',
            'email' => 'required|email',
            'phone' => 'required|string',
            'photo_url' => 'nullable|string',
            'bio' => 'nullable|string',
            'start_date' => 'required|date',
            'ministry_teams' => 'nullable|string',
        ];
    }
}
