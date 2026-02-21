<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_helper_methods()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $staff = User::factory()->create(['role' => 'staff']);
        $readonly = User::factory()->create(['role' => 'readonly']);

        // Test isAdmin
        $this->assertTrue($admin->isAdmin());
        $this->assertFalse($staff->isAdmin());
        $this->assertFalse($readonly->isAdmin());

        // Test isStaff
        $this->assertFalse($admin->isStaff());
        $this->assertTrue($staff->isStaff());
        $this->assertFalse($readonly->isStaff());

        // Test isReadOnly
        $this->assertFalse($admin->isReadOnly());
        $this->assertFalse($staff->isReadOnly());
        $this->assertTrue($readonly->isReadOnly());

        // Test hasRole
        $this->assertTrue($admin->hasRole('admin'));
        $this->assertFalse($admin->hasRole('staff'));

        // Test hasAnyRole
        $this->assertTrue($admin->hasAnyRole(['admin', 'staff']));
        $this->assertTrue($staff->hasAnyRole(['admin', 'staff']));
        $this->assertFalse($readonly->hasAnyRole(['admin', 'staff']));
    }
}
