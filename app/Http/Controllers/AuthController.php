<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Logauth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
       
        $validator = Validator::make(
            $request->all(),
            [
                'email'    => 'required|email',
                'password' => 'required|string|min:6',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $token_validity = (24 * 60);

        auth()->factory()->setTTL($token_validity);

        if (!$token = auth()->attempt($validator->validated())) {
            return response("User can't perform this action.", 401);
        }
        $token_post = bin2hex(random_bytes(24));
     
            $logauth = new  Logauth();
            $logauth->ip= $_SERVER['REMOTE_ADDR'];
            $logauth->device= $_SERVER['HTTP_USER_AGENT'];
            $logauth->agent= $logauth->getagent($_SERVER['HTTP_USER_AGENT']);
            $logauth->systeme= $logauth->getsysteme($_SERVER['HTTP_USER_AGENT']);
            $logauth->id_user= auth()->user()->id;
            $logauth->save();
            auth()->user()->remember_token = $token;
            auth()->user()->token_post=$token_post;
            auth()->user()->update();
        return $this->respondWithToken($token,$token_post);
    }
  /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateprofile(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);
        auth()->user()->name = $request->name;
        auth()->user()->email = $request->email;
        auth()->user()->update();
        return response()->json([
        'message' => 'User update successfully',
        'user'=>auth()->user(),
        'status'=>'200', 
        'token_post'=>$request->token_post]);
    }
    
    
        /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name'     => 'required|string|between:2,100',
                'email'    => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [$validator->errors()],
                422
            );
        }

        $user = User::create(
            array_merge(
                $validator->validated(),
                ['password' => bcrypt($request->password)]
            )
        );

        return response()->json(['message' => 'User created successfully', 'user' => $user]);

    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token,$token_post)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'token_post'=>$token_post
        ]);
    }
 
   
}
