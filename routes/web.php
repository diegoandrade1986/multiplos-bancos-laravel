<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



//dd(session()->all());


use Illuminate\Support\Facades\Auth;

Route::get('/', function(){
    return view('layout');
});

Auth::routes();
Route::group([], function() {
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');
    Route::get('/secao', 'SecaoTecnicaController@index');
});


//Route::get('api/customer', 'CustomerController@getData');
//Route::get('api/secao', 'SecaoTecnicaController@getData');
//Route::resource('secao_tecnica', 'SecaoTecnicaController');
//Route::get('api/tabela_preco', 'TabelaPrecoController@getData');
//Route::resource('tabela_preco', 'TabelaPrecoController');
//Route::get('/home', 'HomeController@index')->name('home');
