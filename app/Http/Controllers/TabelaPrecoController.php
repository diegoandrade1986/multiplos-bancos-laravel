<?php

namespace App\Http\Controllers;

use App\Http\Requests\TabelaPrecoResquest;
use App\TabelaPreco;

class TabelaPrecoController extends Controller
{
    public function index()
    {
        return view('tabelaPreco.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TabelaPrecoResquest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TabelaPrecoResquest $request, TabelaPreco $tabela_preco)
    {
        $create = $tabela_preco->create($request->all());
        return response()->json($create);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  TabelaPrecoResquest  $request
     * @param  \App\TabelaPreco  $tabela_preco
     * @return \Illuminate\Http\Response
     */
    public function update(TabelaPrecoResquest $request, TabelaPreco $tabela_preco)
    {
        $create = $tabela_preco->update($request->all());
        return response()->json($create);
    }

    public function getData()
    {
        $model = TabelaPreco::searchPaginateAndOrder();
        $columns = TabelaPreco::$columns;

        return response()
            ->json([
                'model' => $model,
                'columns' => $columns
            ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TabelaPreco $tabela_preco
     * @return \Illuminate\Http\Response
     */
    public function destroy(TabelaPreco $tabela_preco)
    {
        $delete = $tabela_preco->delete();
        return response()->json($delete);
    }
}
