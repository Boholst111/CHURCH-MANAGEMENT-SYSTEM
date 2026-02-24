<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SmallGroup extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'leader_name',
        'meeting_day',
        'meeting_time',
        'location',
    ];

    /**
     * Validation rules for small group data.
     *
     * @return array<string, mixed>
     */
    public static function validationRules()
    {
        return [
            'name' => 'required|string|max:100|unique:small_groups,name',
            'description' => 'nullable|string',
            'leader_name' => 'required|string|max:100',
            'meeting_day' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'meeting_time' => 'required|string',
            'location' => 'required|string',
        ];
    }

    /**
     * Get the members for the small group.
     */
    public function members()
    {
        return $this->hasMany(Member::class);
    }

    /**
     * Get the member count for the small group.
     *
     * @return int
     */
    public function getMemberCountAttribute()
    {
        return $this->members()->count();
    }
}
