<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix'=> 'user','namespace' => 'App\Http\Controllers'], function() {
        Route::post('login', 'AuthController@login');
        Route::post('register', 'AuthController@register');
    Route::group(['middleware' => 'jwt.verify'], function(){
        Route::get('profile', 'AuthController@me');
        Route::get('users', 'AuthController@getUsers');
    Route::group(['middleware' => 'veriftokenpost'], function(){   
        Route::post('codes', 'AuthController@code');
        Route::post('tache', 'TachesController@create');
        Route::put('updateprofile', 'AuthController@updateprofile');
        });
    });

});
