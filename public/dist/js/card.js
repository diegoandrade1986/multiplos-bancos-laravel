$(function() {
    function insertHtmlCard(dados) {
        var html = '';
        for (i = 0; i < dados.length; i++) {
            html += '<tr>';
            html += '<td>' + dados[i].id +'</td>';
            html += '<td>' + dados[i].card_autorizacao +'</td>';
            html += '<td>' + dados[i].card_digitos +'</td>';
            html += '<td>' + dados[i].card_valor +'</td>';
            html += '<td><a href="/card/edit/' + dados[i].id +'" target="_blank" class="btn btn-success btn-sm"><i class="fa fa-edit"></i> Editar </a></td></tr>';
        }
        $('#card-add').html(html);
    }
    function getCards(recibo) {
        $.ajax({
            url: "/card/show/"+recibo,
            dataType: "json",
            method: 'GET',
            timeout:5000,
            //data: {'id':recibo},
            success: function( data ) {
                console.log(data);
                insertHtmlCard(data);
            },
            error: function(data) {
                alert("Erro Ao listar Cartao! \n Tente Novamente!")
                console.log("ERROR");
                console.log(data);
            }
        });
    }
    /*Adiciona card*/
    if ($('#btn-add-card').length > 0) {
        $('#btn-add-card').click(function (e) {
            e.preventDefault();
            var loading = $("#loading");
            loading.addClass("overlay");
            loading.html('<i class="fa fa-refresh fa-spin"></i>');
            var error = "";
            var html = '';
            var inputs = $('input');
            inputs.each(function () {
                // verificar um a um e passar a false se algum falhar
                // no lugar do if pode-se usar alguma função de validação, regex ou outros
                if (!this.value) {
                    //error += this.attr('name');
                    error = "Preencha todos os campos";
                    // parar o loop, evitando que mais inputs sejam verificados sem necessidade
                    //return false;
                }
            });
            if (error != "") {
                e.preventDefault();
                alert(error);
                loading.removeClass("overlay");
                loading.html('');
                return false;
            }
            var dados = $("form").serialize();
            console.log(dados);
            $.ajax({
                url: "/card/apistore",
                dataType: "json",
                method: 'post',
                timeout: 5000,
                data: dados,
                success: function (data) {
                    //console.log(data.recibo_id);
                    getCards(data.recibo_id);
                    $("#card_serie").val('');
                    $("#card_numero").val('');
                    loading.removeClass("overlay");
                    loading.html('');
                },
                error: function (data) {
                    alert("Erro Ao inserir Cartao! \n Tente Novamente!")
                    loading.removeClass("overlay");
                    loading.html('');
                    console.log("ERROR");
                    console.log(data);
                }
            });
        });
    }
});