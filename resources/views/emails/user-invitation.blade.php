@component('mail::message')
# You're Invited!

Hello,

You've been invited to join **{{ config('app.name') }}** as a **{{ ucfirst($invitation->role) }}**.

Click the button below to set up your account:

@component('mail::button', ['url' => $setupUrl])
Set Up Account
@endcomponent

This invitation will expire on **{{ $expiresAt }}**.

If you didn't expect this invitation, you can safely ignore this email.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
