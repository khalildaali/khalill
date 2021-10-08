<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class veriftokenpost
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {    if(auth()->user()->token_post != $request->token_post){
                auth()->logout();  
                $token_post = bin2hex(random_bytes(24));
                $request->token_post = $token_post;
                auth()->user()->token_post=$token_post;
                auth()->user()->update();      
            }
             return $next($request);
    }
    public function terminate($request, $response)
    {
        $response = $next($request);
        return $response;
       
}
}
