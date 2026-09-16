<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Display the About page.
     */
    public function about(): Response
    {
        return Inertia::render('About', [
            'aboutTitle' => SiteSetting::get('about_title', 'Kisah Dimulainya Beach Camp'),
            'aboutStory' => SiteSetting::get('about_story'),
        ]);
    }

    /**
     * Display the Contact & FAQ page.
     */
    public function contact(): Response
    {
        $faqs = [
            [
                'question' => 'Apa saja yang perlu dibawa saat camping di Beach Camp?',
                'answer' => 'Jika Anda memesan paket lengkap kami, perlengkapan tidur (tenda, matras, sleeping bag) sudah kami siapkan. Anda cukup membawa pakaian ganti, jaket hangat, perlengkapan mandi pribadi, obat-obatan pribadi, dan sandal santai.',
            ],
            [
                'question' => 'Jam berapa jadwal Check-in dan Check-out?',
                'answer' => 'Jadwal check-in mulai pukul 14.00 WIB dan check-out maksimal pukul 12.00 WIB keesokan harinya agar tim kami bisa membersihkan dan mensterilkan area tenda untuk tamu berikutnya.',
            ],
            [
                'question' => 'Apakah aman camping di pinggir pantai saat malam hari?',
                'answer' => 'Sangat aman. Kawasan Beach Camp dipantau oleh tim pengelola dan security 24 jam. Area perkemahan berada di elevasi aman dari pasang air laut.',
            ],
            [
                'question' => 'Apakah tersedia toilet dan colokan listrik?',
                'answer' => 'Ya! Kami menyediakan toilet bersih dengan shower air tawar serta terminal colokan listrik untuk mengisi daya ponsel dan kamera Anda.',
            ],
            [
                'question' => 'Bagaimana kebijakan pembatalan (reschedule / cancel)?',
                'answer' => 'Reschedule dapat dilakukan maksimal H-3 sebelum tanggal kedatangan (tergantung ketersediaan). Pembatalan sepihak DP tidak dapat dikembalikan namun dapat dialihkan ke tanggal lain.',
            ],
        ];

        return Inertia::render('Contact', [
            'faqs' => $faqs,
            'mapsEmbed' => SiteSetting::get('google_maps_embed'),
        ]);
    }
}
