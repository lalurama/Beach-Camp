<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Paket Sunset Duo',
                'slug' => 'paket-sunset-duo',
                'short_description' => 'Sempurna untuk pasangan atau 2 orang sahabat menikmati senja tepi pantai.',
                'description' => 'Rasakan pengalaman camping tepi pantai dengan fasilitas lengkap tanpa ribet. Tenda dome double-layer waterproof siap pakai menghadap langsung ke bibir pantai dengan pemandangan sunset terbaik.',
                'capacity_min' => 1,
                'capacity_max' => 2,
                'price_regular' => 250000,
                'price_weekend' => 300000,
                'features' => [
                    'Tenda Dome Kapasitas 2-3 orang',
                    '2 Matras Spons & 2 Sleeping Bag tebal',
                    'Lampu tenda portable LED',
                    'Akses colokan listrik di shelter utama',
                    'Akses toilet & kamar bilas bersih 24 jam',
                    'Tiket masuk pantai untuk 2 orang',
                    'Spot api unggun bersama malam hari',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
                'badge' => 'Pilihan Populer',
                'is_popular' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Paket Family Beach Camp',
                'slug' => 'paket-family-beach-camp',
                'short_description' => 'Kenyamanan liburan keluarga di alam bebas dengan fasilitas ekstra lega.',
                'description' => 'Liburan keluarga seru di pesisir pantai! Tenda kapasitas besar dengan ruang tidur lega dan teras santai. Dilengkapi meja lipat dan kursi santai untuk quality time bersama keluarga.',
                'capacity_min' => 3,
                'capacity_max' => 5,
                'price_regular' => 550000,
                'price_weekend' => 650000,
                'features' => [
                    'Tenda Keluarga Besar (Family Tent 4-6P)',
                    '4 Matras empuk & 4 Bantal santai',
                    '4 Sleeping Bag hangat',
                    'Set meja lipat + 4 kursi camping lipat',
                    'Lampu tenda + stopkontak kabel ke tenda',
                    'Sarapan pagi roti bakar & teh/kopi hangat (4 porsi)',
                    'Akses kamar mandi bilas bersih',
                    'Parkir kendaraan gratis',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
                'badge' => 'Ramah Keluarga',
                'is_popular' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Paket Glamping Romantic Coastal',
                'slug' => 'paket-glamping-romantic-coastal',
                'short_description' => 'Pengalaman glamor camping tepi laut dengan kasur springbed & dekorasi estetik.',
                'description' => 'Nikmati sensasi menginap di tenda Bell Tent Bohemian eksklusif dengan kasur springbed queen, lampu fairy light hangat, karpet etnik, dan pemandangan laut lepas yang menenangkan.',
                'capacity_min' => 2,
                'capacity_max' => 2,
                'price_regular' => 750000,
                'price_weekend' => 900000,
                'features' => [
                    'Tenda Bell Tent Bohemian Eksklusif',
                    'Kasur Queen Size empuk + sprei & selimut premium',
                    'Kipas angin portable & dispenser air minum',
                    'Dekorasi lampu estetik hangat & karpet rami',
                    'Welcome drink kelapa muda segar',
                    'Sarapan pagi spesial 2 porsi',
                    'Kamar mandi pribadi semi-outdoor',
                    'Kayu bakar 1 ikat untuk api unggun privat',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80',
                'badge' => 'Eksklusif Glamping',
                'is_popular' => true,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Paket Group Adventure Gathering',
                'slug' => 'paket-group-adventure-gathering',
                'short_description' => 'Paket lengkap untuk komunitas, kantor, atau rombongan pertemanan (8–12 orang).',
                'description' => 'Bikin momen kebersamaan tak terlupakan bersama teman satu komunitas atau kantor di pesisir pantai. Area camp khusus dengan fasilitas barbecue grill dan api unggun besar.',
                'capacity_min' => 8,
                'capacity_max' => 12,
                'price_regular' => 1400000,
                'price_weekend' => 1650000,
                'features' => [
                    '3-4 Unit Tenda Dome Kapasitas 4 orang',
                    'Matras & sleeping bag lengkap sesuai jumlah peserta',
                    'Area kavling khusus private group',
                    'Satu set alat BBQ Grill + arang',
                    'Kayu bakar untuk api unggun besar komunitas',
                    'Sound system portable mini untuk acara malam',
                    'Akses toilet & charging station prioritas',
                    'Fasilitas briefing & panduan keamanan tim lokal',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80',
                'badge' => 'Paling Hemat Grup',
                'is_popular' => false,
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($packages as $data) {
            Package::updateOrCreate(
                ['slug' => $data['slug']],
                $data
            );
        }
    }
}
