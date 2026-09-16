<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlockedDate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminBlockedDateController extends Controller
{
    /**
     * Display blocked dates.
     */
    public function index(): Response
    {
        $blockedDates = BlockedDate::orderBy('date', 'desc')->get();

        return Inertia::render('Admin/BlockedDates/Index', [
            'blockedDates' => $blockedDates,
        ]);
    }

    /**
     * Block a new date.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'reason' => ['nullable', 'string', 'max:255'],
        ]);

        if (BlockedDate::isDateBlocked($validated['date'])) {
            return back()->withErrors(['date' => 'Tanggal ini sudah diblokir sebelumnya.']);
        }

        BlockedDate::create($validated);

        return back()->with('success', 'Tanggal berhasil diblokir.');
    }

    /**
     * Remove a blocked date.
     */
    public function destroy(BlockedDate $blockedDate): RedirectResponse
    {
        $blockedDate->delete();

        return back()->with('success', 'Blokir tanggal berhasil dibuka kembali.');
    }
}
