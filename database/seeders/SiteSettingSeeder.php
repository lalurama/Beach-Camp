<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General
            ['key' => 'site_name', 'value' => 'Beach Camp', 'group' => 'general'],
            ['key' => 'tagline', 'value' => 'Tempat Wisata & Camping Terbaik di Tepi Pantai', 'group' => 'general'],
            ['key' => 'hero_title', 'value' => 'Rasakan Hangatnya Senja & Deburan Ombak di Tepi Pantai', 'group' => 'hero'],
            ['key' => 'hero_subtitle', 'value' => 'Camping pantai nyaman, bersih, dan bebas repot. Bangun pagi dengan pemandangan laut lepas dan nikmati malam hangat di samping api unggun.', 'group' => 'hero'],
            // Contact & Social
            ['key' => 'whatsapp_number', 'value' => '6281234567890', 'group' => 'contact'],
            ['key' => 'contact_email', 'value' => 'halo@beachcamp.id', 'group' => 'contact'],
            ['key' => 'instagram_handle', 'value' => '@beachcamp.id', 'group' => 'contact'],
            ['key' => 'address', 'value' => 'Kawasan Pesisir Pantai Indah, Jalur Lintas Selatan KM 12, Jawa Timur', 'group' => 'contact'],
            ['key' => 'operating_hours', 'value' => 'Check-in: 14.00 WIB | Check-out: 12.00 WIB (Buka Setiap Hari)', 'group' => 'contact'],
            ['key' => 'google_maps_embed', 'value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.28383884!2d110.3!3d-8.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDAnMDAuMCJTIDExMMKwMTgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid', 'group' => 'contact'],
            // About Story
            ['key' => 'about_title', 'value' => 'Kisah Dimulainya Beach Camp', 'group' => 'about'],
            ['key' => 'about_story', 'value' => 'Beach Camp lahir dari kecintaan kami pada ketenangan pantai dan kebersamaan di alam terbuka. Kami ingin menghadirkan tempat berkemah di mana setiap orang—baik keluarga, sahabat, maupun pasangan—bisa menikmati keindahan alam pesisir tanpa harus repot membawa perlengkapan berat. Dengan fasilitas higienis, keamanan terjamin, dan keramahan khas lokal, kami siap menyambut petualangan santai Anda.', 'group' => 'about'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
