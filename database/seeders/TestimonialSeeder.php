<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'customer_name' => 'Dimas & Raras',
                'customer_origin' => 'Jakarta Selatan',
                'rating' => 5,
                'content' => 'Pengalaman glamping terbaik! Sunset-nya benar-benar juara tepat di depan tenda. Fasilitas bersih, kasur empuk, dan staff-nya ramah banget. Pasti bakal balik lagi ke sini buat refreshing.',
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                'stay_date' => 'Agustus 2026',
                'is_approved' => true,
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'customer_name' => 'Keluarga Pak Hendra',
                'customer_origin' => 'Bandung',
                'rating' => 5,
                'content' => 'Bawa anak-anak dan istri liburan camping ke Beach Camp sangat puas. Tendanya luas, kamar mandinya bersih dan wangi, colokan listrik tersedia, dan anak-anak senang banget main pasir pantai sampai sore.',
                'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                'stay_date' => 'Juli 2026',
                'is_approved' => true,
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'customer_name' => 'Adit Nugroho (Komunitas Camp & Trail)',
                'customer_origin' => 'Yogyakarta',
                'rating' => 5,
                'content' => 'Tempat gathering yang asyik banget! Area api unggun luas, fasilitas BBQ lengkap, dan lokasinya aman terpantau 24 jam. Suara deburan ombak malam hari bikin tidur nyenyak maksimal.',
                'avatar_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
                'stay_date' => 'September 2026',
                'is_approved' => true,
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'customer_name' => 'Nadia Putri',
                'customer_origin' => 'Surabaya',
                'rating' => 5,
                'content' => 'Bagi yang mau healing tanpa pusing bawa perlengkapan tenda berat, Beach Camp solusinya. Datang tinggal bawa baju ganti, semua sudah disiapkan rapi dan wangi.',
                'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
                'stay_date' => 'Juni 2026',
                'is_approved' => true,
                'is_featured' => false,
                'sort_order' => 4,
            ],
        ];

        foreach ($testimonials as $data) {
            Testimonial::updateOrCreate(
                ['customer_name' => $data['customer_name']],
                $data
            );
        }
    }
}
