<?php

namespace App\Http\Controllers;

use App\Http\Requests\SecaoTecnicaResquest;
use App\Models\SecaoTecnica;

class SecaoTecnicaController extends Controller
{

    public function index()
    {
        dd(SecaoTecnica::All());
        return view('secao.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SecaoTecnicaResquest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SecaoTecnicaResquest $request, SecaoTecnica $secao_tecnica)
    {
        $create = $secao_tecnica->create($request->all());
        return response()->json($create);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  SecaoTecnicaResquest  $request
     * @param  \App\SecaoTecnica  $secao_tecnica
     * @return \Illuminate\Http\Response
     */
    public function update(SecaoTecnicaResquest $request, SecaoTecnica $secao_tecnica)
    {
        $create = $secao_tecnica->update($request->all());
        return response()->json($create);
    }


    public function getData()
    {
        $model = SecaoTecnica::searchPaginateAndOrder();
        $columns = SecaoTecnica::$columns;

        return response()
            ->json([
                'model' => $model,
                'columns' => $columns
            ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SecaoTecnica $secao_tecnica
     * @return \Illuminate\Http\Response
     */
    public function destroy(SecaoTecnica $secao_tecnica)
    {
        $delete = $secao_tecnica->delete();
        return response()->json($delete);
    }
}
