<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $galleries = [
            // Lokasi
            [
                'title' => 'Garis Pantai Pasir Putih Beach Camp',
                'category' => 'lokasi',
                'media_type' => 'image',
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Pemandangan laut luas dan pantai berpasir lembut tepat di depan area tenda.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Matahari Terbenam di Bibir Pantai',
                'category' => 'lokasi',
                'media_type' => 'image',
                'image_url' => 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Warna langit senja terracotta yang magis menyinari area perkemahan setiap sore.',
                'sort_order' => 2,
            ],
            // Fasilitas
            [
                'title' => 'Tenda Glamping Bohemian Mewah',
                'category' => 'fasilitas',
                'media_type' => 'image',
                'image_url' => 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Interior tenda yang nyaman dengan kasur empuk dan penerangan estetik.',
                'sort_order' => 3,
            ],
            [
                'title' => 'Area Santai & Kursi Pantai Terbuka',
                'category' => 'fasilitas',
                'media_type' => 'image',
                'image_url' => 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Kursi santai dan hammock untuk rebahan sambil menikmati angin laut sepoi-sepoi.',
                'sort_order' => 4,
            ],
            // Aktivitas
            [
                'title' => 'Keseruan BBQ Bareng Sahabat di Tepi Pantai',
                'category' => 'aktivitas',
                'media_type' => 'image',
                'image_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Menikmati jagung bakar dan seafood fresh ditemani alunan ombak.',
                'sort_order' => 5,
            ],
            [
                'title' => 'Bermain Air & Kano Santai',
                'category' => 'aktivitas',
                'media_type' => 'image',
                'image_url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Aktivitas air seru di pagi hari saat ombak pantai tenang.',
                'sort_order' => 6,
            ],
            // Malam
            [
                'title' => 'Api Unggun Hangat di Bawah Langit Berbintang',
                'category' => 'malam',
                'media_type' => 'image',
                'image_url' => 'https://images.unsplash.com/photo-1508873696983-2df5293cb39f?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Momen berkumpul, bernyanyi, dan menikmati hangatnya api unggun di malam pantai.',
                'sort_order' => 7,
            ],
            [
                'title' => 'Gemerlap Lampu Tenda di Malam Hari',
                'category' => 'malam',
                'media_type' => 'image',
                'image_url' => 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
                'caption' => 'Suasana malam Beach Camp yang syahdu dan tenang.',
                'sort_order' => 8,
            ],
        ];

        foreach ($galleries as $item) {
            Gallery::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}
