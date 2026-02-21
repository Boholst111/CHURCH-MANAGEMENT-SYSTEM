<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use RuntimeException;

class AuditLog extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     * Only created_at is used for audit logs.
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
        'model_type',
        'model_id',
        'old_values',
        'new_values',
        'ip_address',
        'created_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'created_at' => 'datetime',
    ];

    /**
     * Boot the model and register event listeners to enforce immutability.
     */
    protected static function boot()
    {
        parent::boot();

        // Prevent updates to audit logs
        static::updating(function ($auditLog) {
            throw new RuntimeException('Audit logs are immutable and cannot be modified.');
        });

        // Prevent deletion of audit logs
        static::deleting(function ($auditLog) {
            throw new RuntimeException('Audit logs are immutable and cannot be deleted.');
        });
    }

    /**
     * Override the update method to prevent updates.
     *
     * @param  array  $attributes
     * @param  array  $options
     * @return bool
     */
    public function update(array $attributes = [], array $options = [])
    {
        throw new RuntimeException('Audit logs are immutable and cannot be modified.');
    }

    /**
     * Override the delete method to prevent deletion.
     *
     * @return bool|null
     */
    public function delete()
    {
        throw new RuntimeException('Audit logs are immutable and cannot be deleted.');
    }

    /**
     * Override the forceDelete method to prevent force deletion.
     *
     * @return bool|null
     */
    public function forceDelete()
    {
        throw new RuntimeException('Audit logs are immutable and cannot be force deleted.');
    }

    /**
     * Get the user who performed the action.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the auditable model.
     */
    public function auditable()
    {
        return $this->morphTo('model');
    }
}
