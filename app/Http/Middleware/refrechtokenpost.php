<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Logauth;
class refrechtokenpost
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
      $
        if($request->getRequestUri()!=="/api/auth/login" && in_array(strtolower($request->getMethod()),array('post','put','delete'))){
             $request->access_token= auth()->refresh();
        }
        return $next($request);
    }

        /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */

}
