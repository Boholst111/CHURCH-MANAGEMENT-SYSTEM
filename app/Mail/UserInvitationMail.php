<?php

namespace App\Mail;

use App\Models\UserInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserInvitationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public UserInvitation $invitation;
    public string $setupUrl;

    /**
     * Create a new message instance.
     *
     * @param UserInvitation $invitation
     * @return void
     */
    public function __construct(UserInvitation $invitation)
    {
        $this->invitation = $invitation;
        $this->setupUrl = url("/setup-account?token={$invitation->token}");
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('You\'re invited to join ' . config('app.name'))
                    ->markdown('emails.user-invitation')
                    ->with([
                        'invitation' => $this->invitation,
                        'setupUrl' => $this->setupUrl,
                        'expiresAt' => $this->invitation->expires_at->format('F j, Y'),
                    ]);
    }
}
