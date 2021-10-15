<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class decript
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
        $datacripty =$request->data;
        $datasepar = explode(md5(';'),$datacripty);
        if($datasepar[0]==md5('shyrineprod') && $datasepar[2] == md5('key-secret')){
            $data = base64_decode($datasepar[1]);
            $donner = json_decode($data);
        }
        
        $request->merge(['email'=>$donner->email]);
        $request->merge(['password'=>$donner->password]);
        return $next($request);
    }
}
