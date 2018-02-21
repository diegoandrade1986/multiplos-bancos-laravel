<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SecaoTecnicaResquest extends FormRequest
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
        $secao_tecnica = $this->route('secao_tecnica');
        if ($this->method() == 'PUT') {
            return [
                'sigla' => [
                    'required',
                    'min:2',
                    'max:15',
                    'unique:secao_tecnicas,sigla,'.$secao_tecnica['id']
                ],
                'descricao' => 'required|min:5|max:255',
            ];

        }
        return [
            'sigla' => [
                'required',
                'min:2',
                'max:15',
                'unique:secao_tecnicas'
            ],
            'descricao' => 'required|min:5|max:255',
        ];
    }
}
