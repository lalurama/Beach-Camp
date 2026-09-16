<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminGalleryController extends Controller
{
    /**
     * Display a listing of gallery items.
     */
    public function index(): Response
    {
        $galleries = Gallery::orderBy('sort_order')->latest()->get();

        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Store a new gallery item.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'category' => ['required', 'in:lokasi,fasilitas,aktivitas,malam'],
            'media_type' => ['required', 'in:image,video'],
            'image_url' => ['required', 'string', 'max:500'],
            'caption' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
        ]);

        Gallery::create($validated);

        return back()->with('success', 'Media galeri berhasil ditambahkan.');
    }

    /**
     * Update an existing gallery item.
     */
    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'category' => ['required', 'in:lokasi,fasilitas,aktivitas,malam'],
            'media_type' => ['required', 'in:image,video'],
            'image_url' => ['required', 'string', 'max:500'],
            'caption' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
        ]);

        $gallery->update($validated);

        return back()->with('success', 'Media galeri berhasil diperbarui.');
    }

    /**
     * Delete a gallery item.
     */
    public function destroy(Gallery $gallery): RedirectResponse
    {
        $gallery->delete();

        return back()->with('success', 'Media galeri berhasil dihapus.');
    }
}
