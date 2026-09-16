<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@beachcamp.id'],
            [
                'name' => 'Admin Beach Camp',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            PackageSeeder::class,
            GallerySeeder::class,
            TestimonialSeeder::class,
            BlockedDateSeeder::class,
            SiteSettingSeeder::class,
            BookingSeeder::class,
        ]);
    }
}
