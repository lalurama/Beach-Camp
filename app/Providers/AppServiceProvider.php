<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        $host = (string) (request()->getHost() ?? '');
        $isLocalhost = in_array(strtolower($host), ['localhost', '127.0.0.1', '::1', ''], true);

        if (
            $this->app->environment('production')
            || (! $this->app->runningInConsole() && ! $isLocalhost)
            || str_starts_with((string) config('app.url'), 'https://')
            || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
            || (isset($_SERVER['HTTP_CF_VISITOR']) && str_contains((string) $_SERVER['HTTP_CF_VISITOR'], 'https'))
            || filter_var(env('FORCE_HTTPS', false), FILTER_VALIDATE_BOOLEAN)
        ) {
            URL::forceScheme('https');
        }
    }
}
