<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class FixUserRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:fix-role {email} {role=admin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update a user\'s role';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $email = $this->argument('email');
        $role = $this->argument('role');

        $validRoles = ['admin', 'staff', 'readonly'];
        
        if (!in_array($role, $validRoles)) {
            $this->error("Invalid role. Must be one of: " . implode(', ', $validRoles));
            return 1;
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("User with email {$email} not found.");
            return 1;
        }

        $oldRole = $user->role;
        $user->role = $role;
        $user->save();

        $this->info("User role updated successfully!");
        $this->line("Email: {$user->email}");
        $this->line("Old Role: {$oldRole}");
        $this->line("New Role: {$user->role}");

        return 0;
    }
}
