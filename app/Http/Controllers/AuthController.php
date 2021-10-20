<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Taches;
use App\Models\Logauth;
use App\Mail\UserCode;
use App\Models\Code;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','code']]);
      
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $datacripty =$request->data;
        $datacripty =$request->data;
        $datasepar = explode(md5(';'),$datacripty);
        if($datasepar[0]==md5('shyrineprod') && $datasepar[2] == md5('key-secret')){
            $data = base64_decode($datasepar[1]);
            $donner = json_decode($data);
       
        $request->merge(['email'=>$donner->email]);
        $request->merge(['password'=>$donner->password]);
        $validator = Validator::make(
            $request->all(),
            [
                'email'    => 'email',
                'password' => 'string|min:6',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // $token_validity = (24 * 60);

        // auth()->factory()->setTTL($token_validity);

        if (!$token = auth()->attempt($validator->validated())) {
            return response("Token incorrect.", 401);
        }
        $token_post = bin2hex(random_bytes(24));
        $logauth = new  Logauth();
        $countauth =$logauth->where('id_user',auth()->user()->id)
        ->where('ip',$_SERVER['REMOTE_ADDR'])
        ->where('agent',$logauth->getagent($_SERVER['HTTP_USER_AGENT']))
        ->where('systeme',$logauth->getsysteme($_SERVER['HTTP_USER_AGENT']))
        ->orderBy('created_at', 'desc')->get();
        $exist = 'false';
        if(count($countauth)===0){
            $code = new Code();
            $code->id_user = auth()->user()->id;
            $code->code = rand(100000,999999);
            $code->etat = '0';
            $code->save();
                Mail::to(auth()->user()->email)->send(new UserCode($code,auth()->user()));
                $exist = 'true';
        }
            auth()->user()->remember_token = $token;
            auth()->user()->token_post=$token_post;
            auth()->user()->update();
        return $this->respondWithToken($token,$token_post,$exist);
     }else {
        return response(['message'=>"Unauthorized."], 401);
     }
    }
  /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateprofile(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
            'name' => 'required',
            'email' => 'required|email',
            ]
        );
         if ($validator->fails()) {
            return response()->json(
                [$validator->errors(),'token_post'=>$request->token_post],
                422
            );
        }
        auth()->user()->name = $request->name;
        auth()->user()->email = $request->email;
        auth()->user()->update();
        return response()->json([
        'message' => 'les données ont été modifiées avec succès',
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
                'id_role' => 'required|',
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
     * Get  Users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsers()
    {
        return response()->json(['donne'=>User::all()]);
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
     * Get all of the tasks for the user.
     */
    public function tasks()
    {
        return $this->hasMany(Taches::class);
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token,$token_post=null,$exist=null)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'exist' => $exist,
            'expires_in' => auth()->factory()->getTTL() ,
            'token_post'=>$token_post,
            'message'=>'Login ou mot de passe invalide.'
        ]);
    }
      /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function code(Request $request){
        header("Access-Control-Allow-Origin: *");
        header("access-control-allow-methods: *");
        $validator = Validator::make(
            $request->all(),
            [
                'email'    => 'email',
                'password' => 'string|min:6',
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        if(strtoupper(auth()->user()->email) ==strtoupper($request->email)){
                        $code = new Code();
                $exist = $code->where('id_user',auth()->user()->id)
                        ->where('code',$request->code)
                        ->where('etat',0)
                        ->orderBy('created_at', 'desc')
                        ->limit(1)
                        ->get();
                        
                        if(count($exist) !==0){
                                $logauth = new  Logauth();
                                $logauth->ip= $_SERVER['REMOTE_ADDR'];
                                $logauth->device= $_SERVER['HTTP_USER_AGENT'];
                                $logauth->agent= $logauth->getagent($_SERVER['HTTP_USER_AGENT']);
                                $logauth->systeme= $logauth->getsysteme($_SERVER['HTTP_USER_AGENT']);
                                $logauth->id_user= auth()->user()->id;
                                $logauth->save();
                                $code1 =Code::find($exist[0]->id);
                                $code1->etat ='1';
                                $code1->save();
                            return response()->json([
                                'message' => 'code Correct',
                                'user'=>auth()->user(),
                                'status'=>'200', 
                                'token_post'=>$request->token_post]);
                        }else{
                                return response()->json([
                                    'message' => 'donneé Incorrect',
                                    'user'=>auth()->user(),
                                    'status'=>'409', 
                                    'token_post'=>$request->token_post],409);
                        }
         }else{
            return response()->json([
                'message' => 'donneé Incorrect',
                'user'=>auth()->user(),
                'status'=>'409', 
                'token_post'=>$request->token_post],409);
        }
    }
       
}
