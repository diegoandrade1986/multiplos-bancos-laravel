<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GetClient
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        // \DB::purge('mysql');
        // \DB::reconnect('client2');
        // session(['basedados' => 'mysql2']);
        // dd();
        // dd(DB::getConnections());

        \DB::reconnect(session()->get('default_connection'));
        return $next($request);
    }
}
