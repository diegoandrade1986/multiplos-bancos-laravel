<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Helper\DataViewer;

class SecaoTecnica extends Model
{
    use DataViewer;

    protected $fillable = [
        'sigla', 'descricao'
    ];

    public static $columns = [
        'id', 'sigla', 'descricao'
    ];
}
