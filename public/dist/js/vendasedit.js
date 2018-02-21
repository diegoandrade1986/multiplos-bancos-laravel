
function calculaTotalSaldo() {
    /*var pagoTotal = parseFloat(number_format($('#pago_total').val(),2,'.',''));
     var TotalReal = parseFloat(number_format($('#valor_total_real').val(),2,'.',''));
     var totalDesconto = parseFloat(number_format($('#desconto_real').val(),2,'.',''));
     var Total = TotalReal - pagoTotal - totalDesconto;*/
    var pagoTotal = parseFloat(number_format($('#pago_total').val(), 2, '.', ''));
    var TotalReal = parseFloat(number_format($('#valor_total').val(), 2, '.', ''));
    /*var totalDesconto = parseFloat(number_format($('#desconto').val(), 2, '.', ''));*/
    var Total = TotalReal - pagoTotal;
    $('#saldo').val(number_format(Total, 2, '.', ','));
    if ($('#a-pagar').length > 0) {
        $('#a-pagar').html("<b class='pull-right'>À Pagar: " + number_format(Total, 2, '.', ',') + "</b>");
    }
}

function insertHtmlPagamento(dados) {
    console.log(dados);
    var html = '<table id="example1" class="table table-bordered table-striped table-responsive">';
    html += '<thead>';
    //html += '<tr><td colspan="7"><strong>Beneficiários Adicionados</strong></td> ';
    html += '<tr><th><strong>Nº Recibo</strong></th> ';
    html += '<th><strong>Valor</strong></th> ';
    html += '<th><strong>Forma Pagamento</strong></th> ';
    /*html += '<th><strong>Data Nascimento</strong></th> ';*/
    html += '<th><strong>Parcelas</strong></th> ';
    html += '<th><strong>Detalhes do Pagamento</strong></th> ';
    html += '<th><strong>Data</strong></th> ';
    /*html += '<th><strong>Impressão</strong></th> ';*/
    html += '<th><strong>Opções</strong></th> ';
    html += '</tr></thead>';
    html += '<tbody>';
    var total = 0;
    for (var i = 0; i < dados.length; i++) {
        html += '<tr>';
        html += '<td>' + dados[i].id + '</td>';
        html += '<td>' + number_format(dados[i].valor_dolar, 2, '.', ',') + '</td>';
        html += '<td>' + dados[i].forma_pagamento + '</td>';
        html += '<td>' + dados[i].parcelas + '</td>';
        html += '<td>' + dados[i].informacao + '</td>';
        html += '<td>' + formatDate(dados[i].created_at) + '</td>';
        /*html += '<td><a href="/recibo/print/' + dados[i].recibo_id + '" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-print"></i> Imprimir </a></td>';*/
        /*if (dados[i].forma_pagamento == "Cartão") {
         html += '<td><a href="/card/find/' + dados[i].recibo_id +'" class="btn btn-default btn-sm"><i class="fa fa-edit"></i> Dados Cartão </a></td>';
         } else if (dados[i].forma_pagamento == "Cheque") {
         html += '<td><a href="/cheque/find/' + dados[i].recibo_id +'" class="btn btn-default btn-sm"><i class="fa fa-edit"></i> Dados Cheque </a></td>';
         } else {
         html += '<td></td>';
         }*/
/*
        if (dados[i].forma_pagamento == "Cartão") {
            html += '<td><button data-href="/card/find/' + dados[i].recibo_id + '" class="btn btn-default btn-sm getModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit"></i> Dados Cartão </button>';
        } else if (dados[i].forma_pagamento == "Cheque") {
            html += '<td><button data-href="/cheque/find/' + dados[i].recibo_id + '" class="btn btn-default btn-sm getModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit"></i> Dados Cheque </button>';
        } else {
            html += '<td>';
        }

        */
        html += '<td><div class="btn-group">' +
            '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '<i class="fa fa-cog"></i>&nbsp;&nbsp;&nbsp;<span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu">' +
            '<li><a href="/recibo/print/' + dados[i].recibo_id + '" target="_blank" class=""><i class="fa fa-print"></i> Imprimir </a>' +
            '<li><a href="javascript:void(0)" data-href="/pagamentos/edit/' + dados[i].id + '" class="getModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit"></i> Editar </a>';

        //html += '<li><a href="javascript:void(0)" data-href="/destroy/edit/' + dados[i].id + '" class="getModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-trash"></i> Excluir </a>';
        if (dados[i].permission === true) {
            html += '<li><a href="javascript:void(0)" onclick="destroyPagamento(' + dados[i].id + ')"><i class="fa fa-trash"></i> Excluir </a>';
        }
        if (dados[i].forma_pagamento == "Cheque") {
            html += '<li><a href="javascript:void(0)" data-href="/cheque/find/' + dados[i].recibo_id + '" class="getModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-file-text-o"></i> Dados Cheque </a>';
        }
        if (dados[i].forma_pagamento == "Cartão") {
            html += '<li><a href="javascript:void(0)" data-href="/card/find/' + dados[i].recibo_id + '" class="getModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-cc-mastercard"></i> Dados Cartão </a>';
        }
        html += '</ul></div>';

        total = parseFloat(total) + parseFloat(dados[i].valor_dolar);
    }
    html += '</table>';
    $('#pagamentos-efetuados').html(html);
    $('#pago_total').val(total);
    calculaTotalSaldo();
}

/* Listando os pagamentos da venda */
var pagamentoVenda = function() {
    $.ajax({
        url: "/pagamentos/find",
        dataType: "json",
        method: 'post',
        async : false,
        timeout:10000,
        data: {
            venda_id: $("#id").val(),
            '_token':$('input[name=_token]').val()
        },
        success: function( data ) {
            console.log(data);
            insertHtmlPagamento(data);
            calculaTotalSaldo();
        },
        error: function(data) {
            alert("Erro Ao listar Pagamentos! \n Tente Novamente!")
            console.log("ERROR");
            console.log(data);
        }
    });
};

function carregarDados(){
    var clienteid = $('#clienteid').val();

    if(clienteid != "" && clienteid.length >= 1){
        $.ajax({
            url: "/clientes/find",
            dataType: "json",
            method: 'post',
            data: {
                acao: 'consulta',
                id: clienteid,
                '_token':$('input[name=_token]').val()
            },
            success: function( data ) {
                console.log(data);
                $('#nome').val(data.nome);
                $(".cnpj").css({'display':'none'});
                if (data.cpf != "") {
                    $('#cpf').val(data.cpf);
                    $(".cnpj").css({'display':'none'});
                    $(".cpf").css({'display':'block'});
                    $("#cnpj").val("");
                    $("input[name=opt][value='cnpj']").prop("checked", false);
                    $("input[name=opt][value='cpf']").prop("checked", true);
                } else {
                    $('#cnpj').val(data.cnpj);
                    $(".cpf").css({'display':'none'});
                    $(".cnpj").css({'display':'block'});
                    $("#cpf").val("");
                    $("input[name=opt]").val("cnpj");
                    $("input[name=opt][value='cnpj']").prop("checked", true);
                    $("input[name=opt][value='cpf']").prop("checked", false);
                }
                $('#cep').val(data.cep);
                $('#endereco').val(data.endereco);
                $('#bairro').val(data.bairro);
                $('#cidade').val(data.cidade);
                $('#uf').val(data.uf);
                $('#telefone_residencial').val(data.telefone_residencial);
                $('#celular').val(data.celular);
                $('#telefone_comercial').val(data.telefone_comercial);
                $('#email').val(data.email);

            }
        });
    }
}

function calculaSaldo() {
    var totalPacote = parseFloat(number_format($('#valor_total_pacote').val(),2,'.',''));
    var totalTerrestre = parseFloat(number_format($('#valor_total_terrestre').val(),2,'.',''));
    var totalAereo = parseFloat(number_format($('#valor_total_aereo').val(),2,'.',''));
    var totalDesconto = parseFloat(number_format($('#desconto').val(),2,'.',''));
    var totalEmbarque = parseFloat(number_format($('#valor_total_embarque').val(),2,'.',''));
    var totalRemessa = parseFloat(number_format($('#valor_total_remessa').val(),2,'.',''));
    var totalOutros = parseFloat(number_format($('#valor_total_outros').val(),2,'.',''));
    //var totalPacoteReal = $('#valor_total_pacote_real');
    //var totalTerrestreReal = $('#valor_total_terrestre_real');
    //var totalAereoReal = $('#valor_total_aereo_real');
    //var totalEmbarqueReal = $('#valor_total_embarque_real');
    //var totalRemessaReal = $('#valor_total_remessa_real');
    //var totalDescontoReal = $('#desconto_real');
    //var cambioPacote = $('#cambio_pacote').val();
    //var cambioTerrestre = $('#cambio_terrestre').val();
    //var cambioAereo = $('#cambio_aereo').val();
    //var cambioEmbarque = $('#cambio_embarque').val();
    //var cambioRemessa = $('#cambio_remessa').val();
    //var cambioDesconto = $('#cambio_desconto').val();

    //$(totalPacoteReal).val(number_format(totalPacote * cambioPacote,2,'.',','));
    //$(totalTerrestreReal).val(number_format(totalTerrestre * cambioTerrestre,2,'.',','));
    //$(totalAereoReal).val(number_format(totalAereo * cambioAereo,2,'.',','));
    //$(totalEmbarqueReal).val(number_format(totalEmbarque * cambioEmbarque,2,'.',','));
    //$(totalRemessaReal).val(number_format(totalRemessa * cambioRemessa,2,'.',','));
    //$(totalDescontoReal).val(number_format(totalDesconto * cambioDesconto,2,'.',','));
    /*dolar*/
    var total = totalPacote + totalTerrestre + totalAereo + totalRemessa + totalEmbarque + totalOutros - totalDesconto;
    $('#valor_total').val(number_format(total,2,'.',','));
    /* real */
    //var valorP = parseFloat(number_format($(totalPacoteReal).val(),2,'.',''));
    //var valorT = parseFloat(number_format($(totalTerrestreReal).val(),2,'.',''));
    //var valorA = parseFloat(number_format($(totalAereoReal).val(),2,'.',''));
    //var valorE = parseFloat(number_format($(totalEmbarqueReal).val(),2,'.',''));
    //var valorR = parseFloat(number_format($(totalRemessaReal).val(),2,'.',''));
    //var valorD = parseFloat(number_format($(totalDescontoReal).val(),2,'.',''));
    //var totalReal = valorP + valorT + valorA + valorE + valorR;
    var saldo = total;
    //$('#valor_total_real').val(number_format(totalReal,2,'.',','));
    $('#saldo').val(number_format(saldo,2,'.',','));
}

function calculaValor () {
    var real = $("#valor");
    var dolar = $("#valor_dolar");
    var cambio = $("#cambio");
    if (real.val() != "" && real.val() > 0 && cambio.val() != "") {
        var totalReal = parseFloat(number_format(real.val(),2,'.',''));
        $(dolar).val(number_format((totalReal / cambio.val()),2,'.',','));
    }
    if (dolar.val() != "" && dolar.val() > 0 && cambio.val() != "") {
        var totalDolar = parseFloat(number_format(dolar.val(),2,'.',''));
        $(real).val(number_format((totalDolar * cambio.val()),2,'.',','));
    }
}

function calculaValorReal () {
    var real = $("#valor");
    var dolar = $("#valor_dolar");
    var cambio = $("#cambio");
    if (real.val() != "" && parseFloat(real.val()) > 0 && cambio.val() != "") {
        var totalReal = parseFloat(number_format(real.val(),2,'.',''));
        //parseFloat(number_format($('#valor_total_pacote').val(),2,'.',''));
        $(dolar).val(number_format((totalReal / cambio.val()),2,'.',','));
    }
}

function calculaValorDolar () {
    var real = $("#valor");
    var dolar = $("#valor_dolar");
    var cambio = $("#cambio");
    if (dolar.val() != "" && parseFloat(dolar.val()) > 0 && cambio.val() != "") {
        var totalDolar = parseFloat(number_format(dolar.val(),2,'.',''));
        $(real).val(number_format((totalDolar * cambio.val()),2,'.',','));
    }
}


$(function() {

    beneficiariosVenda();
    pagamentoVenda();
    var str = window.location.href;
    var n = str.indexOf("#");
    if (n > -1) {
        $('#tab5').click();
    }

    $('.cambioPagamento')
        .mask("9.99?99")
        .focusout(function (event) {
            var target, phone, element;
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;
            phone = target.value.replace(/\D/g, '');
            element = $(target);
            element.unmask();
            if(phone.length > 4) {
                element.mask("9.99?99");
            } else {
                element.mask("9.?99");
            }
        });

    $("#submit").click(function(e){
        e.preventDefault();
        if ($("#id").val() <= 0) {
            alert("Insira o Cliente!");
            $('#tab1').trigger("click");
            $('#nome').focus();
            return false;
        }
        if ($.trim($("#destino").val()) == "") {
            alert("Insira o Destino da Viagem!");
            $('#tab2').trigger("click");
            $('#destino').focus();
            return false;
        }
        if ($.trim($("#data_embarque").val()) == "") {
            alert("Insira a Data de embarque!");
            $('#tab2').trigger("click");
            $('#data_embarque').focus();
            return false;
        }
        /*if ($.trim($("#cambio_terrestre").val()) == "") {
            alert("Insira o Câmbio Terrestre!");
            $('#tab4').trigger("click");
            $('#destino').focus();
            return false;
        }
        if ($.trim($("#cambio_aereo").val()) == "") {
            alert("Insira o Câmbio Aéreo!");
            $('#tab4').trigger("click");
            $('#destino').focus();
            return false;
        }
        if ($.trim($("#cambio_remessa").val()) == "") {
            alert("Insira o Câmbio Remessa!");
            $('#tab4').trigger("click");
            $('#destino').focus();
            return false;
        }
        if ($.trim($("#cambio_embarque").val()) == "") {
            alert("Insira o Câmbio Embarque!");
            $('#tab4').trigger("click");
            $('#destino').focus();
            return false;
        }
        if ($.trim($("#cambio_desconto").val()) == "") {
            alert("Insira o Câmbio Desconto!");
            $('#tab4').trigger("click");
            $('#destino').focus();
            return false;
        }*/
        $.ajax({
            url: $("#edit-venda").attr('action'),
            dataType: "json",
            method: 'post',
            timeout:10000,
            data: $("#edit-venda").serialize(),
            success: function( data ) {
                console.log(data);
                if (data.success === true) {
                    window.location.href = "/vendas";
                } else {
                    alert("error");
                }
            }
        });
    });

    $(".cambio").change(function(){
        calculaSaldo();
    });

    /*function limpaCampos(){
        var busca = $('#busca').val();

        if(busca == ""){
            $('#codigo_barra').val('');
            $('#titulo_livro').val('')
            $('#categoria').val('');
            $('#valor_compra').val('');
            $('#valor_venda').val('');
            $('#data_cadastro').val('');
            $('#status').val('')
        }
    }*/

/*    $("#nome").autocomplete({
        source: "/clientes/search",
        minLength: 1
    });*/

    $(".cnpj").css({'display':'none'});

    if ($.trim($("#cnpj").val()) == "") {
        $(".cnpj").css({'display':'none'});
        $(".cpf").css({'display':'block'});
        $("#cnpj").val("");
        $("#labelNome").text("Nome do Cliente");
        $("#nome").attr("placeholder","Nome do Cliente");
        $("input[name=opt][value='cpf']").prop("checked", true);
        $("input[name=opt][value='cnpj']").prop("checked", false);
    } else {
        $(".cpf").css({'display':'none'});
        $(".cnpj").css({'display':'block'});
        $("#cpf").val("");
        $("#labelNome").text("Razão Social");
        $("#nome").attr("placeholder","Razão Social");
        $("input[name=opt][value='cnpj']").prop("checked", true);
        $("input[name=opt][value='cpf']").prop("checked", false);
    }

    $("input[name=opt]").change(function(){
        if ($(this).val() == "cpf") {
            $(".cnpj").css({'display':'none'});
            $(".cpf").css({'display':'block'});
            $("#cnpj").val("");
            /*$("#labelNome").text("Nome do Cliente");
             $("#nome").attr("placeholder","Nome do Cliente");*/
        }
        if ($(this).val() == "cnpj") {
            $(".cpf").css({'display':'none'});
            $(".cnpj").css({'display':'block'});
            $("#cpf").val("");
            /*$("#labelNome").text("Razão Social");
             $("#nome").attr("placeholder","Razão Social");*/
        }
    });





    /*BAIXA DE PAGAMENTO*/
    $('#btn-add-pagamento').click(function(e){
        e.preventDefault();
        var btn = $(this);
        $(btn).attr('disabled','disabled');
        var observacao = $("#observacao").val();
        var loading = $("#loadingPagamento");
        loading.addClass("overlay");
        loading.html('<i class="fa fa-refresh fa-spin"></i>');
        var error = "";
        var html = '';
        if ($.trim($("#parcelas").val()) == "") {
            error += "Informe a quantidade Parcelas<br/>";
        }
        if ($.trim($("#valor").val()) == "") {
            error += "Informe o Valor em Reais<br/>";
        }
        if ($.trim($("#valor_dolar").val()) == "") {
            error += "Informe o Valor em Dolar<br/>";
        }
        if ($.trim($("#cambio").val()) == "") {
            error += "Informe o câmbio<br/>";
        }
        if (error != "") {
            html += '<div class="alert alert-warning alert-dismissible">';
            html += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            html += '<h4><i class="icon fa fa-warning"></i> Alerta!</h4>';
            html += error;
            html += '</div>';
            $('#pagamentos-error').html(html);
            loading.removeClass("overlay");
            loading.html('');
            $(btn).attr('disabled',false);
            return false;
        }
        $.ajax({
            url: "/pagamentos/store",
            dataType: "json",
            method: 'post',
            timeout:10000,
            data: {
                venda_id: $("#id").val(),
                valor: $("#valor").val(),
                valor_dolar: $("#valor_dolar").val(),
                cambio: $("#cambio").val(),
                forma_pagamento: $("#forma_pagamento").val(),
                parcelas: $("#parcelas").val(),
                informacao: $("#informacao").val(),
                observacao: observacao,
                '_token':$('input[name=_token]').val()
            },
            success: function( data ) {
                console.log(data);
                insertHtmlPagamento(data.data);
                loading.removeClass("overlay");
                loading.html('');
                $(btn).attr('disabled',false);
            },
            error: function(data) {
                alert("Erro Ao inserir Pagamento! \n Tente Novamente!");
                loading.removeClass("overlay");
                loading.html('');
                console.log("ERROR");
                console.log(data);
                $(btn).attr('disabled',false);
            }
        });
    });
    $(document).on('click', '.getModal', function(e){
        e.preventDefault();
        var link = $(this).attr('data-href');
        $('#my_frame').attr('src',link);

    });

    $("#myModal").on("hidden.bs.modal", function () {
        var link = $('#my_frame').attr('src').split("/");
        if (link[1] == 'beneficiarios') {
            var loading = $("#loading");
            loading.addClass("overlay");
            loading.html('<i class="fa fa-refresh fa-spin"></i>');
            beneficiariosVenda();
            pagamentoVenda();
            if (parseInt($("#id").val()) > 0) {
                $.get( "/calculate/"+$("#id").val(), {'_token':$("input[name=_token]").val()} ,function( data ) {
                    calculaSaldo();
                    calculaTotalSaldo();
                    //$( ".result" ).html( data );
                });
            }
            loading.removeClass("overlay");
            loading.html('');
        }

        if (link[1] == 'pagamentos') {
            var loading = $("#loading-pgt");
            loading.addClass("overlay");
            loading.html('<i class="fa fa-refresh fa-spin"></i>');
            beneficiariosVenda();
            pagamentoVenda();
            if (parseInt($("#id").val()) > 0) {
                $.get( "/calculate/"+$("#id").val(), {'_token':$("input[name=_token]").val()} ,function( data ) {
                    calculaSaldo();
                    calculaTotalSaldo();
                    //$( ".result" ).html( data );
                });
            }
            loading.removeClass("overlay");
            loading.html('');
        }
    });


/*    if($('.getModal').length > 0) {
        $('.getModal').click(function(e){
            e.preventDefault();
            $('#my_frame').attr('src',link);
        });
    }*/

    $("#valor").change(function(){
        calculaValorReal();
    });

    $("#valor_dolar").change(function(){
        calculaValorDolar();
    });

    $("#cambio").change(function(){
        calculaValor();
    });

    $('#btn-salvar-cliente').attr('disabled','disabled');

    /*if($('.getModal').length > 0) {
        $('.getModal').click(function(e){
            e.preventDefault();
            //var link = $(this).attr('data-href');
            alert('ok');
            $('#my_frame').attr('src',link);
        });
    }*/
});
