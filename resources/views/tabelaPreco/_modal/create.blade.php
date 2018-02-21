<div class="modal fade" id="create-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">

    <div class="modal-dialog" role="document">

        <div class="modal-content">

            <div class="modal-header">

                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>

                <h4 class="modal-title" id="myModalLabel">Nova Tabela de Preço</h4>

            </div>

            <div class="modal-body">

                <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="createItem">
                    <div class="form-group">

                        <label for="title">nome:</label>

                        <input type="text" name="nome" class="form-control" v-model="newItem.nome" required/>

                        <span v-if="formErrors['nome']" class="error text-danger">@{{ formErrors['nome'] }}</span>

                    </div>
                    <div class="form-group">

                        <button type="submit" class="btn btn-success">Criar</button>

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
