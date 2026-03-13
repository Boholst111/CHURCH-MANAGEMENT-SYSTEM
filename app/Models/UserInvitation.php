<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Carbon\Carbon;

class UserInvitation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'role',
        'status',
        'token',
        'invited_by',
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'expires_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'token',
    ];

    /**
     * Get the user who sent the invitation.
     */
    public function inviter()
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    /**
     * Check if the invitation has expired.
     *
     * @return bool
     */
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    /**
     * Check if the invitation is still valid.
     *
     * @return bool
     */
    public function isValid(): bool
    {
        return $this->status === 'pending' && !$this->isExpired();
    }

    /**
     * Mark the invitation as accepted.
     *
     * @return void
     */
    public function markAsAccepted(): void
    {
        $this->update(['status' => 'accepted']);
    }

    /**
     * Mark the invitation as expired.
     *
     * @return void
     */
    public function markAsExpired(): void
    {
        $this->update(['status' => 'expired']);
    }

    /**
     * Generate a new invitation token.
     *
     * @return string
     */
    public static function generateToken(): string
    {
        return Str::random(64);
    }

    /**
     * Get the default expiration date (7 days from now).
     *
     * @return Carbon
     */
    public static function getDefaultExpirationDate(): Carbon
    {
        return Carbon::now()->addDays(7);
    }
}
