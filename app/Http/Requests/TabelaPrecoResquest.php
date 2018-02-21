<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TabelaPrecoResquest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $tabela_preco = $this->route('tabela_preco');
        if ($this->method() == 'PUT') {
            return [
                'nome' => [
                    'required',
                    'min:2',
                    'max:100',
                    'unique:tabela_precos,nome,'.$tabela_preco['id']
                ]
            ];

        }
        return [
            'nome' => [
                'required',
                'min:2',
                'max:100',
                'unique:tabela_precos'
            ]
        ];
    }
}
