<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'site' => fn () => [
                'site_name' => SiteSetting::get('site_name', 'Beach Camp'),
                'whatsapp_number' => SiteSetting::get('whatsapp_number', '6281234567890'),
                'contact_email' => SiteSetting::get('contact_email', 'halo@beachcamp.id'),
                'instagram_handle' => SiteSetting::get('instagram_handle', '@beachcamp.id'),
                'address' => SiteSetting::get('address', 'Kawasan Pesisir Pantai Indah, Jawa Timur'),
                'operating_hours' => SiteSetting::get('operating_hours', 'Buka Setiap Hari'),
            ],
        ];
    }
}
