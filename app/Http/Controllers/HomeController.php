<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Package;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index(): Response
    {
        $popularPackages = Package::active()
            ->popular()
            ->orderBy('sort_order')
            ->get();

        if ($popularPackages->isEmpty()) {
            $popularPackages = Package::active()->orderBy('sort_order')->take(3)->get();
        }

        $galleries = Gallery::active()
            ->orderBy('sort_order')
            ->take(6)
            ->get();

        $testimonials = Testimonial::approved()
            ->orderBy('is_featured', 'desc')
            ->orderBy('sort_order')
            ->take(6)
            ->get();

        return Inertia::render('Home', [
            'popularPackages' => $popularPackages,
            'galleries' => $galleries,
            'testimonials' => $testimonials,
            'heroTitle' => SiteSetting::get('hero_title', 'Rasakan Hangatnya Senja & Deburan Ombak di Tepi Pantai'),
            'heroSubtitle' => SiteSetting::get('hero_subtitle', 'Camping pantai nyaman, bersih, dan bebas repot.'),
            'aboutStory' => SiteSetting::get('about_story'),
        ]);
    }
}
