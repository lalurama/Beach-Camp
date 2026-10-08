<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class ForceHttps
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $host = (string) $request->getHost();
        $isLocalhost = in_array(strtolower($host), ['localhost', '127.0.0.1', '::1'], true);

        $shouldForceHttps = ! $isLocalhost
            || $request->isSecure()
            || $request->header('x-forwarded-proto') === 'https'
            || $request->server('HTTP_X_FORWARDED_PROTO') === 'https'
            || (isset($_SERVER['HTTP_CF_VISITOR']) && str_contains((string) $_SERVER['HTTP_CF_VISITOR'], 'https'))
            || app()->environment('production')
            || str_starts_with((string) config('app.url'), 'https://')
            || filter_var(env('FORCE_HTTPS', false), FILTER_VALIDATE_BOOLEAN);

        if ($shouldForceHttps) {
            URL::forceScheme('https');
            $request->server->set('HTTPS', 'on');
        }

        $response = $next($request);

        if ($shouldForceHttps && method_exists($response, 'headers')) {
            $response->headers->set('Content-Security-Policy', 'upgrade-insecure-requests', false);
        }

        return $response;
    }
}
