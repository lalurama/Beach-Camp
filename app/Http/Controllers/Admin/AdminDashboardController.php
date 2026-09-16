<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlockedDate;
use App\Models\Booking;
use App\Models\Package;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin overview dashboard.
     */
    public function index(): Response
    {
        $totalBookings = Booking::count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        $confirmedBookings = Booking::where('status', 'confirmed')->count();
        $totalRevenue = Booking::whereIn('status', ['confirmed', 'completed'])->sum('total_price');
        $activePackages = Package::active()->count();
        $pendingTestimonials = Testimonial::where('is_approved', false)->count();

        $recentBookings = Booking::with('package')
            ->latest()
            ->take(6)
            ->get();

        $upcomingBlockedDates = BlockedDate::whereDate('date', '>=', today())
            ->orderBy('date')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalBookings' => $totalBookings,
                'pendingBookings' => $pendingBookings,
                'confirmedBookings' => $confirmedBookings,
                'totalRevenue' => $totalRevenue,
                'activePackages' => $activePackages,
                'pendingTestimonials' => $pendingTestimonials,
            ],
            'recentBookings' => $recentBookings,
            'upcomingBlockedDates' => $upcomingBlockedDates,
        ]);
    }
}
