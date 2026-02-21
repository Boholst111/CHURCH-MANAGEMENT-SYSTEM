<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchSettings extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'church_settings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'church_name',
        'address',
        'city',
        'state',
        'zip_code',
        'phone',
        'email',
        'website',
        'service_times',
    ];

    /**
     * Validation rules for church settings data.
     *
     * @return array<string, mixed>
     */
    public static function validationRules()
    {
        return [
            'church_name' => 'required|string|max:200',
            'address' => 'required|string|max:200',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'website' => 'nullable|string',
            'service_times' => 'required|string|max:500',
        ];
    }
}
