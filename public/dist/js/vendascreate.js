function carregarDados(){
    var clienteid = $('#clienteid').val();

    if (clienteid != "" && clienteid.length >= 1) {
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
                if ($.trim(data.cpf) != "") {
                    $('#cpf').val(data.cpf);
                    $(".cnpj").css({'display':'none'});
                    $(".cpf").css({'display':'block'});
                    $("#cnpj").val("");
                    $('input:radio[name=opt]').filter('[value=cpf]').prop('checked', true);
                } else {
                    $('#cnpj').val(data.cnpj);
                    $(".cpf").css({'display':'none'});
                    $(".cnpj").css({'display':'block'});
                    $("#cpf").val("");
                    $("input[name=opt]").val("cnpj");
                    $('input:radio[name=opt]').filter('[value=cnpj]').prop('checked', true);
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
                $('#btn-salvar-cliente').attr('disabled','disabled');
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
    var totalPacoteReal = $('#valor_total_pacote_real');
    var totalTerrestreReal = $('#valor_total_terrestre_real');
    var totalAereoReal = $('#valor_total_aereo_real');
    var totalEmbarqueReal = $('#valor_total_embarque_real');
    var totalRemessaReal = $('#valor_total_remessa_real');
    var totalDescontoReal = $('#desconto_real');
    var cambioPacote = $('#cambio_pacote').val();
    var cambioTerrestre = $('#cambio_terrestre').val();
    var cambioAereo = $('#cambio_aereo').val();
    var cambioEmbarque = $('#cambio_embarque').val();
    var cambioRemessa = $('#cambio_remessa').val();
    var cambioDesconto = $('#cambio_desconto').val();

    $(totalPacoteReal).val(number_format(totalPacote * cambioPacote,2,'.',','));
    $(totalTerrestreReal).val(number_format(totalTerrestre * cambioTerrestre,2,'.',','));
    $(totalAereoReal).val(number_format(totalAereo * cambioAereo,2,'.',','));
    $(totalEmbarqueReal).val(number_format(totalEmbarque * cambioEmbarque,2,'.',','));
    $(totalRemessaReal).val(number_format(totalRemessa * cambioRemessa,2,'.',','));
    $(totalDescontoReal).val(number_format(totalDesconto * cambioDesconto,2,'.',','));
    /*dolar*/
    var total = totalPacote + totalTerrestre + totalAereo + totalRemessa + totalEmbarque + totalOutros;
    $('#valor_total').val(number_format(total,2,'.',','));
    /* real */
    var valorP = parseFloat(number_format($(totalPacoteReal).val(),2,'.',''));
    var valorT = parseFloat(number_format($(totalTerrestreReal).val(),2,'.',''));
    var valorA = parseFloat(number_format($(totalAereoReal).val(),2,'.',''));
    var valorE = parseFloat(number_format($(totalEmbarqueReal).val(),2,'.',''));
    var valorR = parseFloat(number_format($(totalRemessaReal).val(),2,'.',''));
    var valorD = parseFloat(number_format($(totalDescontoReal).val(),2,'.',''));
    var totalReal = valorP + valorT + valorA + valorE + valorR;
    var saldo = totalReal - valorD;
    $('#valor_total_real').val(number_format(totalReal,2,'.',','));
    $('#saldo').val(number_format(total-totalDesconto,2,'.',','));
}

function clearInputs(id)
{
    $(id).find('input:text, input:password, input:file, select, textarea').each(function() {
        $(this).val('');
    });
}

$(function() {
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
            loading.removeClass("overlay");
            loading.html('');
        }
    });

    $.ajax({
        url: "/config/all",
        dataType: "json",
        method: 'get',
        data: {
            '_token':$('input[name=_token]').val()
        },
        success: function( data ) {
            var html = "";
            for (i = 0; i < data.length; i++) {
                if (html != "") html += " | ";
                html += data[i].descricao + " " + data[i].value;
                /*if (data[i].descricao == "Câmbio Terrestre") {
                    html += "Câmbio Terrestre: " + $("#cambio_terrestre").val(data[i].value) + "<br/>";
                }
                if (data[i].descricao == "Câmbio Aéreo") {
                    html += "Câmbio Terrestre: " + $("#cambio_aereo").val(data[i].value) + "<br/>";
                    ;
                }*/
            }
            $(".lembrete").html("<small>"+html+"</small>");
        }, error: function (data) {
            console.log(data);
        }
    });
    $(".cnpj").css({'display':'none'});
    $("input[name=opt]").change(function(){
        if ($(this).val() == "cpf") {
            $(".cnpj").css({'display':'none'});
            $(".cpf").css({'display':'block'});
            $("#cnpj").val("");
            $("#cpf").mask("999.999.999-99");
            /*$("#labelNome").text("Nome do Cliente");
            $("#nome").attr("placeholder","Nome do Cliente");*/
        }
        if ($(this).val() == "cnpj") {
            $(".cpf").css({'display':'none'});
            $(".cnpj").css({'display':'block'});
            $('#cnpj').mask("99.999.999/9999-99");
            $("#cpf").val("");
            /*$("#labelNome").text("Razão Social");
            $("#nome").attr("placeholder","Razão Social");*/
        }
    });

    $("#submit").click(function(e){
        e.preventDefault();
        if ($("#clienteid").val() <= 0) {
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
            url: $("#store-venda").attr('action'),
            dataType: "json",
            method: 'post',
            timeout:3000,
            data: $("#store-venda").serialize(),
            success: function( data ) {
                console.log(data);
                if (data.success === true) {
                    //var confirm = confirm("Deseja Realizar a baixa de pagamento");
                    if (confirm("Venda Cadastrada com Sucesso! \n Deseja Realizar a baixa de pagamento?")) {
                        window.location.href = "/vendas/edit/"+data.id+"/#tab_5";
                    } else {
                        window.location.href = "/vendas";
                    }
                } else {
                    alert("error");
                }
            }
        });
    });

});