<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display the gallery page.
     */
    public function index(Request $request): Response
    {
        $category = $request->input('category', 'all');

        $query = Gallery::active()->orderBy('sort_order');

        if ($category !== 'all' && in_array($category, ['lokasi', 'fasilitas', 'aktivitas', 'malam'])) {
            $query->where('category', $category);
        }

        $galleries = $query->get();

        return Inertia::render('Gallery/Index', [
            'galleries' => $galleries,
            'currentCategory' => $category,
        ]);
    }
}
