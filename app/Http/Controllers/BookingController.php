<?php

namespace App\Http\Controllers;

use App\Models\BlockedDate;
use App\Models\Booking;
use App\Models\Package;
use App\Models\SiteSetting;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Show the booking form.
     */
    public function create(Request $request): Response
    {
        $packages = Package::active()->orderBy('sort_order')->get();

        $selectedPackageSlug = $request->query('package');
        $selectedPackage = null;
        if ($selectedPackageSlug) {
            $selectedPackage = $packages->firstWhere('slug', $selectedPackageSlug);
        }

        // Get blocked dates for the next 90 days
        $blockedDates = BlockedDate::whereDate('date', '>=', today())
            ->whereDate('date', '<=', today()->addDays(90))
            ->pluck('date')
            ->map(fn ($d) => $d instanceof Carbon ? $d->format('Y-m-d') : Carbon::parse($d)->format('Y-m-d'))
            ->values();

        return Inertia::render('Booking/Create', [
            'packages' => $packages,
            'selectedPackage' => $selectedPackage,
            'blockedDates' => $blockedDates,
        ]);
    }

    /**
     * Store a new booking.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'package_id' => ['required', 'exists:packages,id'],
            'customer_name' => ['required', 'string', 'max:100'],
            'customer_email' => ['required', 'email', 'max:100'],
            'customer_phone' => ['required', 'string', 'max:20'],
            'check_in_date' => ['required', 'date', 'after_or_equal:today'],
            'check_out_date' => ['required', 'date', 'after:check_in_date'],
            'guests_count' => ['required', 'integer', 'min:1'],
            'customer_notes' => ['nullable', 'string', 'max:500'],
        ]);

        $checkIn = Carbon::parse($validated['check_in_date']);
        $checkOut = Carbon::parse($validated['check_out_date']);

        // Check if any date in range is blocked
        $period = CarbonPeriod::create($checkIn, $checkOut->copy()->subDay());
        foreach ($period as $date) {
            if (BlockedDate::isDateBlocked($date)) {
                return back()->withErrors([
                    'check_in_date' => 'Tanggal '.$date->format('d/m/Y').' tidak tersedia untuk reservasi.',
                ]);
            }
        }

        $package = Package::findOrFail($validated['package_id']);

        // Calculate total price based on days and weekday/weekend
        $totalPrice = 0;
        foreach ($period as $date) {
            // Friday and Saturday considered weekend
            $isWeekend = $date->isFriday() || $date->isSaturday();
            if ($isWeekend && $package->price_weekend) {
                $totalPrice += $package->price_weekend;
            } else {
                $totalPrice += $package->price_regular;
            }
        }

        // Calculate tents needed
        $tentsCount = max(1, (int) ceil($validated['guests_count'] / max(1, $package->capacity_max)));

        $booking = Booking::create([
            'booking_code' => Booking::generateBookingCode(),
            'package_id' => $package->id,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'check_in_date' => $checkIn->toDateString(),
            'check_out_date' => $checkOut->toDateString(),
            'guests_count' => $validated['guests_count'],
            'tents_count' => $tentsCount,
            'total_price' => $totalPrice,
            'status' => 'pending',
            'customer_notes' => $validated['customer_notes'] ?? null,
        ]);

        return redirect()->route('booking.success', $booking->booking_code)
            ->with('success', 'Reservasi berhasil dibuat! Silakan simpan kode booking Anda.');
    }

    /**
     * Show booking success page.
     */
    public function success(string $bookingCode): Response
    {
        $booking = Booking::with('package')->where('booking_code', $bookingCode)->firstOrFail();
        $whatsappNumber = SiteSetting::get('whatsapp_number', '6281234567890');

        return Inertia::render('Booking/Success', [
            'booking' => $booking,
            'whatsappNumber' => $whatsappNumber,
        ]);
    }

    /**
     * Check booking status by code.
     */
    public function check(Request $request): Response
    {
        $code = $request->input('code');
        $booking = null;
        $searched = false;

        if ($code) {
            $searched = true;
            $booking = Booking::with('package')
                ->where('booking_code', strtoupper(trim($code)))
                ->first();
        }

        return Inertia::render('Booking/Check', [
            'booking' => $booking,
            'searched' => $searched,
            'code' => $code ?? '',
        ]);
    }
}
