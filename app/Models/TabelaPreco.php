<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Helper\DataViewer;

class TabelaPreco extends Model
{
    use DataViewer;

    protected $fillable = [
        'nome'
    ];

    public static $columns = [
        'id', 'nome'
    ];
}