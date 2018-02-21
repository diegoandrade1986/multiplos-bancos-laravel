<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="myModalLabel">Editando Tabela de Preço: @{{ fillItem.nome }}</h4>
            </div>
            <div class="modal-body">
                <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="updateItem(fillItem.id)">
                    <div class="form-group">

                        <label for="title">Nome:</label>

                        <input type="text" name="nome" class="form-control" v-model="fillItem.nome" required/>

                        <span v-if="formErrorsUpdate['nome']" class="error text-danger">@{{ formErrorsUpdate['nome'] }}</span>

                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success">Editar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>