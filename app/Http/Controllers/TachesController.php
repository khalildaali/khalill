<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Taches;
use Illuminate\Http\Request;

class TachesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'titre'     => 'required|string|between:2,100',
                'description'    => 'required',
                'id_user' => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [$validator->errors(),'token_post'=>$request->token_post],
                422
            );
        }

        $taches = Taches::create(
            array_merge(
                $validator->validated(),
                
            )
        );

        return response()->json(['message' => 'Taches created successfully', 'user' => $taches,'token_post'=>$request->token_post]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Taches  $taches
     * @return \Illuminate\Http\Response
     */
    public function show(Taches $taches)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Taches  $taches
     * @return \Illuminate\Http\Response
     */
    public function edit(Taches $taches)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Taches  $taches
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Taches $taches)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Taches  $taches
     * @return \Illuminate\Http\Response
     */
    public function destroy(Taches $taches)
    {
        //
    }protected function responsews($data,$token_post)
    {
        return response()->json([
            'data' => $data,
            'token_post'=>$token_post
        ]);
    }
}
