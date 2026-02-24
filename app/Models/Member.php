<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'city',
        'status',
        'small_group_id',
        'date_joined',
        'birth_date',
        'gender',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_joined' => 'date',
        'birth_date' => 'date',
    ];

    /**
     * Validation rules for member data.
     *
     * @return array<string, mixed>
     */
    public static function validationRules()
    {
        return [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|unique:members,email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'status' => 'required|in:active,visitor',
            'small_group_id' => 'nullable|exists:small_groups,id',
            'date_joined' => 'required|date',
            'birth_date' => 'nullable|date',
            'gender' => 'required|in:male,female,other',
        ];
    }

    /**
     * Get the small group that the member belongs to.
     */
    public function smallGroup()
    {
        return $this->belongsTo(SmallGroup::class);
    }

    /**
     * Get the tithes for the member.
     */
    public function tithes()
    {
        return $this->hasMany(Tithe::class);
    }
}
