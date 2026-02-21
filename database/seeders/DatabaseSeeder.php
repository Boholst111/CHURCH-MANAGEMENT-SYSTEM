<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Seed church data in the correct order (respecting foreign key constraints)
        $this->call([
            AdminUserSeeder::class,
            ChurchSettingsSeeder::class,
            SmallGroupsSeeder::class,
            MembersSeeder::class,
            LeadershipSeeder::class,
        ]);
    }
}
