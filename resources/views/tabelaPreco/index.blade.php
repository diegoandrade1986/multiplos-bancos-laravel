@extends('layout')
@section('content')
    <div id="app">
        <div class="col-lg-12">

            <button type="button" class="btn btn-success pull-right" data-toggle="modal" data-target="#create-item">
                <i class="fa fa-plus"></i> Nova Tabela de Preço
            </button>
        </div>
        <br/>
        <br/>
        <div class="dv">
            <div class="dv-header">
                <div class="dv-header-title">
                    Tabela de Preço
                </div>
                <div class="dv-header-columns">
                    <span class="dv-header-pre">Campo: </span>
                    <select class="dv-header-select" v-model="query.search_column">
                        <option v-for="column in columns" :value="column">@{{column}}</option>
                    </select>
                </div>
                <div class="dv-header-search">
                    <input type="text" class="dv-header-input"
                           placeholder="Pesquisar"
                           v-model="query.search_input"
                           @keyup.enter="fetchIndexData()">
                </div>
                <div class="dv-header-submit">
                    <button class="dv-header-btn btn btn-success" @click="fetchIndexData()"><i class="fa fa-search"></i> Filtrar</button>
                </div>
            </div>
            <div class="dv-body">
                <table class="dv-table">
                    <thead>
                    <tr>
                        <th class="hover" v-for="column in columns" @click="toggleOrder(column)">
                        <span>@{{column}}</span>
              <span class="dv-table-column" v-if="column === query.column">
                <span v-if="query.direction === 'desc'">&darr;</span>
                <span v-else>&uarr;</span>
              </span>
                        </th>
                        <th>
                            Ações
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in model.data">
                        {{--<td v-for="(value, key) in row">@{{value}}</td>--}}
                        <td>@{{row.id}}</td>
                        <td>@{{row.nome}}</td>
                        <td>
                            <button class="btn btn-xs btn-primary" @click.prevent="editItem(row)"><i class="fa fa-edit"></i> Editar</button>

                            <button class="btn btn-xs btn-danger" @click.prevent="deleteItem(row)"><i class="fa fa-trash"></i> Excluir</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="dv-footer">
                <div class="dv-footer-item">
                    <span>Mostrando @{{model.from}} - @{{model.to}} de @{{model.total}} registros</span>
                </div>
                <div class="dv-footer-item">
                    <div class="dv-footer-sub">
                        <span>Registros por página</span>
                        <input type="text" v-model="query.per_page"
                               class="dv-footer-input"
                               @keyup.enter="fetchIndexData()">
                    </div>
                    <div class="dv-footer-sub">
                        <button class="dv-footer-btn" @click="prev()">&laquo;</button>
                        <input type="text" v-model="query.page"
                               class="dv-footer-input"
                               @keyup.enter="fetchIndexData()">
                        <button class="dv-footer-btn" @click="next()">&raquo;</button>
                    </div>
                </div>
            </div>
        </div>

        @include('tabelaPreco._modal.create')

        @include('tabelaPreco._modal.update')
    </div>
@endsection

@section('css')

@endsection

@section('script')
    <script>
        new Vue({
            el: '#app',
            data() {
                return {
                    model: {},
                    columns: {},
                    query: {
                        page: 1,
                        column: 'id',
                        direction: 'desc',
                        per_page: 15,
                        search_column: 'id',
                        search_input: ''
                    },
                    formErrors:{},
                    formErrorsUpdate:{},
                    newItem : {'nome':''},
                    fillItem : {'nome':'','id':''}
                }
            },
            created() {
                this.fetchIndexData();
            },
            methods: {
                next() {
                    if(this.model.next_page_url) {
                        this.query.page++;
                        this.fetchIndexData();
                    }
                },
                prev() {
                    if(this.model.prev_page_url) {
                        this.query.page--;
                        this.fetchIndexData();
                    }
                },
                toggleOrder(column) {
                    if(column === this.query.column) {
                        // only change direction
                        if(this.query.direction === 'desc') {
                            this.query.direction = 'asc';
                        } else {
                            this.query.direction = 'desc';
                        }
                    } else {
                        this.query.column = column;
                        this.query.direction = 'asc';
                    }

                    this.fetchIndexData();
                },
                fetchIndexData() {
                    var vm = this;
                    axios.get(`/api/tabela_preco?column=${this.query.column}&direction=${this.query.direction}&page=${this.query.page}&per_page=${this.query.per_page}&search_column=${this.query.search_column}&search_input=${this.query.search_input}`)
                            .then(function(response) {
                                Vue.set(vm.$data, 'model', response.data.model);
                                Vue.set(vm.$data, 'columns', response.data.columns);
                            })
                            .catch(function(response) {
                                errorGlobal(res.response);
                            })
                },
                createItem(){

                    var input = this.newItem;

                    axios.post('/tabela_preco',input).then((response) => {

                        this.newItem = {'nome': ''};

                    $("#create-item").modal('hide');
                    new PNotify({
                        title: 'Aviso',
                        text: 'Registro Criado com sucesso',
                        styling: 'brighttheme',
                        type: 'success'
                    });
                    this.fetchIndexData();
                    this.cleanObjectErrors();

                    }, (res) => {
                        errorGlobal(res.response);
                        this.formErrors = res.response.data;
                    });


                },
                deleteItem(item){
                    const vm = this;
                    swal({
                        title:"Alerta",
                        text: "Deseja Deletar esse registro?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: "Sim",
                        cancelButtonText: "Não"
                    }).then(function(response){
                        if (response.value) {
                            axios.delete('/tabela_preco/' + item.id).then((response) => {
                                new PNotify({
                                    title: 'Aviso',
                                    text: 'Registro deletado com sucesso',
                                    styling: 'brighttheme',
                                    type: 'success'
                                });
                            vm.fetchIndexData();
                            this.cleanObjectErrors();
                            });
                        }
                    }).catch(function(res){
                        errorGlobal(res.response);
                    });
                },
                editItem: function(item){
                    this.fillItem.nome = item.nome;
                    this.fillItem.id = item.id;
                    $("#edit-item").modal('show');
                },
                updateItem: function(id){

                    var input = this.fillItem;

                    axios.put('/tabela_preco/'+id,input)
                            .then((response) => {
                        this.fillItem = {'nome': '', 'id': ''};
                    $("#edit-item").modal('hide');
                    new PNotify({
                        title: 'Aviso',
                        text: 'Registro Alterado com sucesso',
                        styling: 'brighttheme',
                        type: 'success'
                    });
                    this.fetchIndexData();
                    this.cleanObjectErrors();

                }, (res) => {
                        errorGlobal(res.response);
                        this.formErrorsUpdate = res.response.data;
                    });
                },
                cleanObjectErrors: function() {
                    this.formErrors = {};
                    this.formErrorsUpdate = {};
                }

            }
        })
    </script>
@endsection



