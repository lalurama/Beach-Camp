<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminPackageController extends Controller
{
    /**
     * Display a listing of all packages for admin.
     */
    public function index(): Response
    {
        $packages = Package::orderBy('sort_order')->get();

        return Inertia::render('Admin/Packages/Index', [
            'packages' => $packages,
        ]);
    }

    /**
     * Store a newly created package.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'short_description' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'capacity_min' => ['required', 'integer', 'min:1'],
            'capacity_max' => ['required', 'integer', 'min:1'],
            'price_regular' => ['required', 'integer', 'min:0'],
            'price_weekend' => ['nullable', 'integer', 'min:0'],
            'features' => ['nullable', 'array'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'badge' => ['nullable', 'string', 'max:50'],
            'is_popular' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $validated['slug'] = Str::slug($validated['name']).'-'.rand(100, 999);

        Package::create($validated);

        return back()->with('success', 'Paket berhasil ditambahkan.');
    }

    /**
     * Update the specified package.
     */
    public function update(Request $request, Package $package): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'short_description' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'capacity_min' => ['required', 'integer', 'min:1'],
            'capacity_max' => ['required', 'integer', 'min:1'],
            'price_regular' => ['required', 'integer', 'min:0'],
            'price_weekend' => ['nullable', 'integer', 'min:0'],
            'features' => ['nullable', 'array'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'badge' => ['nullable', 'string', 'max:50'],
            'is_popular' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $package->update($validated);

        return back()->with('success', 'Paket berhasil diperbarui.');
    }

    /**
     * Remove the specified package.
     */
    public function destroy(Package $package): RedirectResponse
    {
        $name = $package->name;
        $package->delete();

        return back()->with('success', "Paket {$name} berhasil dihapus.");
    }
}
