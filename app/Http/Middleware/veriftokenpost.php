<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Logauth;
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
    {   
        $datacripty =$request->data;
        $datasepar = explode(md5(';'),$request->data);
        if($datasepar[0]==md5('shyrineprod') && $datasepar[2] == md5('key-secret')){
            $data = base64_decode($datasepar[1]);
            $donner = json_decode($data);
            
        foreach($donner as $key => $value){
            $request->merge([$key=>$value]);  
        }

        if(auth()->user()->token_post !== $request->token_post){
                 auth()->logout();  
            }
            $url = parse_url($_SERVER['REQUEST_URI']);
            $logauth =Logauth::where('id_user',  auth()->user()->id)->orderBy('created_at', 'desc')->first();
            if($url['path'] != '/api/user/codes'  ){
                if(count($logauth->toArray()) !=0){
                    if( $logauth->ip !== $_SERVER['REMOTE_ADDR']  || $logauth->agent != $logauth->getagent($_SERVER['HTTP_USER_AGENT']) || $logauth->systeme != $logauth->getsysteme($_SERVER['HTTP_USER_AGENT'])){
                        auth()->logout(); 
                }
           }
        }
                $token_post = bin2hex(random_bytes(24));
                $request->token_post = $token_post;
                auth()->user()->token_post=$token_post;
                auth()->user()->update();   
             return $next($request);
            }else{
                return response()->json(['message' => 'Token is Expired'], 500);
            }
    }

}
