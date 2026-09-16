<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminTestimonialController extends Controller
{
    /**
     * Display testimonials list.
     */
    public function index(): Response
    {
        $testimonials = Testimonial::latest()->get();

        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Update testimonial approval or featured status.
     */
    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validate([
            'is_approved' => ['boolean'],
            'is_featured' => ['boolean'],
        ]);

        $testimonial->update($validated);

        return back()->with('success', 'Status testimoni berhasil diperbarui.');
    }

    /**
     * Delete a testimonial.
     */
    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return back()->with('success', 'Testimoni berhasil dihapus.');
    }
}
