<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminBookingController extends Controller
{
    /**
     * Display a listing of bookings.
     */
    public function index(Request $request): Response
    {
        $query = Booking::with('package')->latest();

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('booking_code', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%")
                    ->orWhere('customer_email', 'like', "%{$search}%");
            });
        }

        $bookings = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'filters' => [
                'status' => $request->input('status', 'all'),
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    /**
     * Update booking status and admin notes.
     */
    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,cancelled,completed'],
            'admin_notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $booking->update($validated);

        return back()->with('success', "Status reservasi {$booking->booking_code} berhasil diperbarui.");
    }

    /**
     * Delete a booking.
     */
    public function destroy(Booking $booking): RedirectResponse
    {
        $code = $booking->booking_code;
        $booking->delete();

        return back()->with('success', "Reservasi {$code} berhasil dihapus.");
    }
}
