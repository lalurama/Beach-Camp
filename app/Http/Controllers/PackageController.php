<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    /**
     * Display a listing of packages with optional filtering.
     */
    public function index(Request $request): Response
    {
        $query = Package::active()->orderBy('sort_order');

        if ($request->filled('guests')) {
            $guests = (int) $request->input('guests');
            $query->where('capacity_min', '<=', $guests)
                ->where('capacity_max', '>=', $guests);
        }

        $packages = $query->get();

        return Inertia::render('Packages/Index', [
            'packages' => $packages,
            'filters' => [
                'guests' => $request->input('guests', ''),
            ],
        ]);
    }

    /**
     * Display a specific package.
     */
    public function show(string $slug): Response
    {
        $package = Package::active()->where('slug', $slug)->firstOrFail();

        $relatedPackages = Package::active()
            ->where('id', '!=', $package->id)
            ->take(3)
            ->get();

        return Inertia::render('Packages/Show', [
            'package' => $package,
            'relatedPackages' => $relatedPackages,
        ]);
    }
}
