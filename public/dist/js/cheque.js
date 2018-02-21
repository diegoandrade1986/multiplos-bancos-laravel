$(function() {
    function insertHtmlCheque(dados) {
        var html = '';
        for (i = 0; i < dados.length; i++) {
            html += '<tr>';
            html += '<td>' + dados[i].id +'</td>';
            html += '<td>' + dados[i].cheque_banco +'</td>';
            html += '<td>' + dados[i].cheque_serie +'</td>';
            html += '<td>' + dados[i].cheque_numero +'</td>';
            html += '<td>' + dados[i].cheque_cpf +'</td>';
            html += '<td>' + dados[i].cheque_valor +'</td>';
            html += '<td><a href="/cheque/edit/' + dados[i].id +'" target="_blank" class="btn btn-success btn-sm"><i class="fa fa-edit"></i> Editar </a></td></tr>';
            /*if (dados[i].forma_pagamento == "Cartão") {
                html += '<td><a href="/cartao/find/' + dados[i].recibo_id +'" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-edit"></i> Dados Cartão </a></td>';
            } else if (dados[i].forma_pagamento == "Cheque") {
                html += '<td><a href="/cheque/find/' + dados[i].recibo_id +'" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-edit"></i> Dados Cheque </a></td>';
            } else {
                html += '<td></td>';
            }

            total = parseFloat(total) + parseFloat(dados[i].valor);*/
        }
        /*$('#cheque-add').find('table tbody').html(html);*/
        $('#cheque-add').html(html);
        /*$('#pago_total').val(total);
        calculaTotalSaldo();*/
    }

    function getCheques(recibo) {
        $.ajax({
            url: "/cheque/show/"+recibo,
            dataType: "json",
            method: 'GET',
            timeout:5000,
            //data: {'id':recibo},
            success: function( data ) {
                console.log(data);
                insertHtmlCheque(data);
            },
            error: function(data) {
                alert("Erro Ao listar Cheques! \n Tente Novamente!")
                console.log("ERROR");
                console.log(data);
            }
        });
    }
    /*Adiciona cheque*/
    if ($('#btn-add-cheque').length > 0) {
        $('#btn-add-cheque').click(function (e) {
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
                url: "/cheque/apistore",
                dataType: "json",
                method: 'post',
                timeout: 5000,
                data: dados,
                success: function (data) {
                    //console.log(data.recibo_id);
                    getCheques(data.recibo_id);
                    $("#cheque_serie").val('');
                    $("#cheque_numero").val('');
                    loading.removeClass("overlay");
                    loading.html('');
                },
                error: function (data) {
                    alert("Erro Ao inserir Cheque! \n Tente Novamente!")
                    loading.removeClass("overlay");
                    loading.html('');
                    console.log("ERROR");
                    console.log(data);
                }
            });
        });
    }
});