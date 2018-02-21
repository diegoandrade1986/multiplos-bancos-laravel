function destroyBeneficiario(id)
{
    if (confirm("Deseja mesmo excluir?")) {
        var loading = $("#loading");
        loading.addClass("overlay");
        loading.html('<i class="fa fa-refresh fa-spin"></i>');
        $.ajax({
            url: "/beneficiarios/destroy/" + id,
            method: 'get',
            timeout: 10000,
            success: function (data) {
                beneficiariosVenda();
                if (parseInt($("#id").val()) > 0) {
                    $.get( "/calculate/"+$("#id").val(), {'_token':$("input[name=_token]").val()} ,function( data ) {
                        calculaSaldo();
                        calculaTotalSaldo();
                        //$( ".result" ).html( data );
                    });
                }
                loading.removeClass("overlay");
                loading.html('');
            },
            error: function (data) {
                alert("Erro Ao Excluir Beneficiario!");
                console.log("ERROR");
                console.log(data);
                loading.removeClass("overlay");
                loading.html('');
            }
        });
    }
}
function destroyPagamento(id)
{
    if (confirm("Deseja mesmo excluir?")) {
        var loading = $("#loading-pgt");
        loading.addClass("overlay");
        loading.html('<i class="fa fa-refresh fa-spin"></i>');
        $.ajax({
            url: "/pagamentos/destroy/" + id,
            method: 'get',
            timeout: 10000,
            success: function (data) {
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
            },
            error: function (data) {
                alert("Erro Ao Excluir Pagamento!");
                console.log("ERROR");
                console.log(data);
                loading.removeClass("overlay");
                loading.html('');
            }
        });
    }
}
/*Listando os beneficiarios da venda*/
var beneficiariosVenda = function () {
    $.ajax({
        url: "/beneficiarios/find/" + $("#id").val() + "/" + $("#vendatemporaria").val(),
        dataType: "json",
        method: 'GET',
        async : false,
        timeout: 10000,
        success: function (data) {
            console.log(data);
            var html = '<table id="example1" class="table table-bordered table-striped table-responsive">';
            html += '<thead>';
            //html += '<tr><td colspan="7"><strong>Beneficiários Adicionados</strong></td> ';
            html += '<tr><th><strong>Nome</strong></th> ';
            html += '<th><strong>CPF</strong></th> ';
            /*html += '<th><strong>Data Nascimento</strong></th> ';*/
            html += '<th><strong>T. B.</strong></th> ';
            html += '<th><strong>Pacote</strong></th> ';
            html += '<th><strong>Terrestre</strong></th> ';
            html += '<th><strong>Aéreo</strong></th> ';
            html += '<th><strong>Desconto</strong></th>';
            html += '<th><strong>Embarque</strong></th> ';
            html += '<th><strong>Remessa</strong></th> ';
            html += '<th><strong>Outros</strong></th> ';
            html += '<th><strong>Ações</strong></th> ';
            html += '</tr></thead>';
            html += '<tbody>';
            var totalPacote = 0;
            var totalEmbarque = 0;
            var totalRemessa = 0;
            var totalDesconto = 0;
            var totalTerrestre = 0;
            var totalAereo = 0;
            var totalOutros = 0;
            for (i = 0; i < data.length; i++) {
                html += '<tr>';
                html += '<td>' + data[i].beneficiario_nome + '</td>';
                html += '<td>' + data[i].beneficiario_cpf + '</td>';
                /*html += '<td>' + data[i].beneficiario_data_nascimento +'</td>';*/
                html += '<td>' + data[i].tipo_beneficiario + '</td>';
                totalPacote = parseFloat(totalPacote) + parseFloat(data[i].beneficiario_valor_pacote);
                totalTerrestre = parseFloat(totalTerrestre) + parseFloat(data[i].beneficiario_valor_terrestre);
                totalAereo = parseFloat(totalAereo) + parseFloat(data[i].beneficiario_valor_aereo);
                totalDesconto = parseFloat(totalDesconto) + parseFloat(data[i].beneficiario_desconto);
                totalEmbarque = parseFloat(totalEmbarque) + parseFloat(data[i].beneficiario_valor_taxa_embarque);
                totalRemessa = parseFloat(totalRemessa) + parseFloat(data[i].beneficiario_valor_taxa_remessa);
                totalOutros = parseFloat(totalOutros) + parseFloat(data[i].beneficiario_valor_outros);
                html += '<td>' + number_format(data[i].beneficiario_valor_pacote, 2, '.', ',') + '</td>';
                html += '<td>' + number_format(data[i].beneficiario_valor_terrestre, 2, '.', ',') + '</td>';
                html += '<td>' + number_format(data[i].beneficiario_valor_aereo, 2, '.', ',') + '</td>';
                html += '<td>' + number_format(data[i].beneficiario_desconto, 2, '.', ',') + '</td>';
                html += '<td>' + number_format(data[i].beneficiario_valor_taxa_embarque, 2, '.', ',') + '</td>';
                html += '<td>' + number_format(data[i].beneficiario_valor_taxa_remessa, 2, '.', ',') + '</td>';
                html += '<td>' + number_format(data[i].beneficiario_valor_outros, 2, '.', ',') + '</td>';
                /*html += '<td><a href="javascript:void(0)" style="margin-right: 10px" class="btn btn-default btn-xs"><i class="fa fa-edit"></i></a>' +
                    '<a href="javascript:void(0)" class="btn btn-default btn-xs" onclick="destroyBeneficiario(' + data[i].id + ')">' +
                    '<i class="fa fa-trash"></i></a></td>';*/
                html += '<td><button data-href="/beneficiarios/edit/' + data[i].id + '" class="btn btn-default btn-xs getModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit"></i></button>' +
                    '<a href="javascript:void(0)" style="margin-left: 10px;" class="btn btn-default btn-xs" onclick="destroyBeneficiario(' + data[i].id + ')">' +
                    '<i class="fa fa-trash"></i></a></td>';
                html += '</tr>';
            }
            var subTotal = totalPacote + totalTerrestre + totalAereo + totalEmbarque + totalRemessa + totalOutros;
            var descontoTotal = totalDesconto;
            var totalTotal = totalPacote + totalTerrestre + totalAereo + totalEmbarque + totalRemessa + totalOutros - totalDesconto;
            html += '<tr><td colspan="9"><b>Sub-Total: ' + number_format(subTotal,2,'.',',') +'<b/></td></tr>';
            html += '<tr><td colspan="9"><b>Total Desconto: ' + number_format(descontoTotal,2,'.',',') +'<b/></td></tr>';
            html += '<tr><td colspan="9"><b>Total Geral: ' + number_format(totalTotal,2,'.',',') +'<b/></td></tr>';
            html += '</table>';
            //var total = number_format(totalTerrestre + totalAereo + totalRemessa + totalEmbarque - totalDesconto,2,'.',',');
            $('#beneficiarios-adicionados').html(html);
            $('#valor_total_pacote').val(number_format(totalPacote,2,'.',','));
            $('#valor_total_terrestre').val(number_format(totalTerrestre, 2, '.', ','));
            $('#valor_total_aereo').val(number_format(totalAereo, 2, '.', ','));
            $('#valor_total_embarque').val(number_format(totalEmbarque, 2, '.', ','));
            $('#valor_total_remessa').val(number_format(totalRemessa, 2, '.', ','));
            $('#valor_total_outros').val(number_format(totalOutros, 2, '.', ','));
            $('#desconto').val(number_format(totalDesconto, 2, '.', ','));
            calculaSaldo();
            if (parseInt($("#id").val()) > 0) {
                calculaTotalSaldo();
            }
        },
        error: function (data) {
            alert("Erro Ao listar beneficiários! \n Tente Novamente!");
            console.log("ERROR");
            console.log(data);
        }
    });
};
$(function() {
    $( "#nome" ).autocomplete({
            minLength: 2,
            source: function( request, response ) {
                $.ajax({
                    url: "/clientes/search",
                    dataType: "json",
                    method: 'post',
                    data: {
                        acao: 'autocomplete',
                        term: $('#nome').val(),
                        '_token':$('input[name=_token]').val()
                    },
                    success: function(data) {
                        console.log(data);
                        response(data);
                    }
                });
            },
            select: function( event, ui ) {
                $("#clienteid").val( ui.item.id);
                carregarDados();
                return false;
            },
            error: function(data){
                console.log(data);
            }
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( '<li></li>' )
            .data( "item.autocomplete", item )
            .append( "<a><b>" + item.nome + "</b></a>" )
            .appendTo( ul );
    };

    $('#btn-add-beneficiario').click(function(e){
        e.preventDefault();
        var loading = $("#loading");
        loading.addClass("overlay");
        loading.html('<i class="fa fa-refresh fa-spin"></i>');
        var error = "";
        var html = '';
        if ($.trim($("#nome_beneficiario").val()) == "") {
            error += "Preencha o Nome do Beneficiário<br/>";
        }
        if ($.trim($("#cpf_beneficiario").val()) == "") {
            error += "Preencha o CPF do Beneficiário<br/>";
        }
        if (error != "") {
            html += '<div class="alert alert-warning alert-dismissible">';
            html += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            html += '<h4><i class="icon fa fa-warning"></i> Alerta!</h4>';
            html += error;
            html += '</div>';
            $('#beneficiarios-error').html(html);
            loading.removeClass("overlay");
            loading.html('');
            return false;
        }
        $.ajax({
            url: "/beneficiarios/store",
            dataType: "json",
            method: 'post',
            timeout:10000,
            data: {
                beneficiarioid: $("#beneficiarioid").val(),
                id: $("#id").val(),
                vendatemporaria: $("#vendatemporaria").val(),
                beneficiario_nome: $("#nome_beneficiario").val(),
                beneficiario_cpf: $("#cpf_beneficiario").val(),
                beneficiario_sexo: $("#beneficiario_sexo").val(),
                beneficiario_tipo_acomodacao: $("#beneficiario_tipo_acomodacao").val(),
                beneficiario_data_nascimento: $("#beneficiario_data_nascimento").val(),
                tipo_beneficiario: $("#tipo_beneficiario").val(),
                beneficiario_valor_pacote: number_format($("#beneficiario_valor_pacote").val(),2,'.',''),
                beneficiario_valor_aereo: number_format($("#beneficiario_valor_aereo").val(),2,'.',''),
                beneficiario_valor_terrestre: number_format($("#beneficiario_valor_terrestre").val(),2,'.',''),
                beneficiario_desconto: number_format($("#beneficiario_desconto").val(),2,'.',''),
                beneficiario_valor_taxa_embarque: number_format($("#beneficiario_valor_taxa_embarque").val(),2,'.',''),
                beneficiario_valor_taxa_remessa: number_format($("#beneficiario_valor_taxa_remessa").val(),2,'.',''),
                beneficiario_valor_outros: number_format($("#beneficiario_valor_outros").val(),2,'.',''),
                '_token':$('input[name=_token]').val()
            },
            success: function( data ) {
                console.log(data);
                html = '<table id="example1" class="table table-bordered table-striped table-responsive">';
                html += '<thead>';
                html += '<tr><th><strong>Nome</strong></th> ';
                html += '<th><strong>CPF</strong></th> ';
                html += '<th><strong>T. B.</strong></th> ';
                html += '<th><strong>Pacote</strong></th> ';
                html += '<th><strong>Terrestre</strong></th> ';
                html += '<th><strong>Aéreo</strong></th> ';
                html += '<th><strong>Desconto</strong></th>';
                html += '<th><strong>Embarque</strong></th> ';
                html += '<th><strong>Remessa</strong></th> ';
                html += '<th><strong>Outros</strong></th> ';
                html += '<th><strong>Ações</strong></th> ';
                html += '</tr></thead>';
                html += '<tbody>';
                var totalPacote = 0;
                var totalEmbarque = 0;
                var totalRemessa = 0;
                var totalDesconto = 0;
                var totalTerrestre = 0;
                var totalAereo = 0;
                var totalOutros = 0;
                for (i = 0; i < data.length; i++) {
                    html += '<tr>';
                    html += '<td>' + data[i].beneficiario_nome +'</td>';
                    html += '<td>' + data[i].beneficiario_cpf +'</td>';
                    html += '<td>' + data[i].tipo_beneficiario +'</td>';
                    totalPacote = parseFloat(totalPacote) + parseFloat(data[i].beneficiario_valor_pacote);
                    totalTerrestre = parseFloat(totalTerrestre) + parseFloat(data[i].beneficiario_valor_terrestre);
                    totalAereo = parseFloat(totalAereo) + parseFloat(data[i].beneficiario_valor_aereo);
                    totalDesconto = parseFloat(totalDesconto) + parseFloat(data[i].beneficiario_desconto);
                    totalEmbarque = parseFloat(totalEmbarque) + parseFloat(data[i].beneficiario_valor_taxa_embarque);
                    totalRemessa = parseFloat(totalRemessa) + parseFloat(data[i].beneficiario_valor_taxa_remessa);
                    totalOutros = parseFloat(totalOutros) + parseFloat(data[i].beneficiario_valor_outros);
                    html += '<td>' + number_format(data[i].beneficiario_valor_pacote,2,'.',',') +'</td>';
                    html += '<td>' + number_format(data[i].beneficiario_valor_terrestre,2,'.',',') +'</td>';
                    html += '<td>' + number_format(data[i].beneficiario_valor_aereo,2,'.',',') +'</td>';
                    html += '<td>' + number_format(data[i].beneficiario_desconto,2,'.',',') +'</td>';
                    html += '<td>' + number_format(data[i].beneficiario_valor_taxa_embarque,2,'.',',') +'</td>';
                    html += '<td>' + number_format(data[i].beneficiario_valor_taxa_remessa,2,'.',',') +'</td>';
                    html += '<td>' + number_format(data[i].beneficiario_valor_outros,2,'.',',') +'</td>';
                    /*html += '<td><a href="javascript:void(0)" style="margin-right: 10px" class="btn btn-default btn-xs"><i class="fa fa-edit"></i></a>' +
                        '<a href="javascript:void(0)" class="btn btn-default btn-xs" onclick="destroyBeneficiario(' + data[i].id + ')">' +
                        '<i class="fa fa-trash"></i></a></td>';*/
                    html += '<td><button data-href="/beneficiarios/edit/' + data[i].id + '" class="btn btn-default btn-xs getModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-edit"></i></button>' +
                        '<a href="javascript:void(0)" style="margin-left: 10px;" class="btn btn-default btn-xs" onclick="destroyBeneficiario(' + data[i].id + ')">' +
                        '<i class="fa fa-trash"></i></a></td>';
                    html += '</tr>';
                }
                var subTotal = totalPacote + totalTerrestre + totalAereo + totalEmbarque + totalRemessa + totalOutros;
                var descontoTotal = totalDesconto;
                var totalTotal = totalPacote + totalTerrestre + totalAereo + totalEmbarque + totalRemessa + totalOutros - totalDesconto;
                html += '<tr><td colspan="9"><b>Sub-Total: ' + number_format(subTotal,2,'.',',') +'<b/></td></tr>';
                html += '<tr><td colspan="9"><b>Total Desconto: ' + number_format(descontoTotal,2,'.',',') +'<b/></td></tr>';
                html += '<tr><td colspan="9"><b>Total Geral: ' + number_format(totalTotal,2,'.',',') +'<b/></td></tr>';
                html += '</table>';
                $('#beneficiarios-adicionados').html(html);
                $('#valor_total_pacote').val(number_format(totalPacote,2,'.',','));
                $('#valor_total_terrestre').val(number_format(totalTerrestre,2,'.',','));
                $('#valor_total_aereo').val(number_format(totalAereo,2,'.',','));
                $('#valor_total_embarque').val(number_format(totalEmbarque,2,'.',','));
                $('#valor_total_remessa').val(number_format(totalRemessa,2,'.',','));
                $('#valor_total_outros').val(number_format(totalOutros,2,'.',','));
                $('#desconto').val(number_format(totalDesconto,2,'.',','));
                loading.removeClass("overlay");
                loading.html('');
                $('#nome_beneficiario').val('');
                $('#cpf_beneficiario').val('');
                $('#beneficiario_data_nascimento').val('');
                $('#beneficiario_valor_pacote').val('');
                $('#beneficiario_valor_terrestre').val('');
                $('#beneficiario_valor_aereo').val('');
                $('#beneficiario_desconto').val('');
                $('#beneficiario_valor_taxa_embarque').val('');
                $('#beneficiario_valor_taxa_remessa').val('');
                $('#beneficiario_valor_outros').val('');
                if (parseInt($("#id").val()) > 0) {
                    pagamentoVenda();
                }
                calculaSaldo();
            },
            error: function(data) {
                alert("Erro Ao inserir beneficiário! \n Tente Novamente!");
                loading.removeClass("overlay");
                loading.html('');
                console.log("ERROR");
                console.log(data);
            }
        });
    });

    $('#btn-salvar-cliente').click(function(e){
        e.preventDefault();
        var nome = $('#nome').val();
        if (nome == "") {
            alert("Preencha o Nome do Cliente");
            return false;
        }
        $.ajax({
            url: "/clientes/apiStore",
            dataType: "json",
            method: 'post',
            timeout:3000,
            data: {
                nome: nome,
                '_token':$('input[name=_token]').val()
            },
            success: function( data ) {
                console.log(data);
                $("#clienteid").val(data.id);
                $("#cpf").removeAttr("readonly");
                $("#cnpj").removeAttr("readonly");
                $("#cep").removeAttr("readonly");
                $("#endereco").removeAttr("readonly");
                $("#bairro").removeAttr("readonly");
                $("#cidade").removeAttr("readonly");
                $("#uf").removeAttr("readonly");
                $("#telefone_residencial").removeAttr("readonly");
                $("#telefone_comercial").removeAttr("readonly");
                $("#celular").removeAttr("readonly");
                $("#email").removeAttr("readonly");
                $("#cpf").mask("999.999.999-99");
                $('.cep').mask("99999-999");
                $('.celular')
                    .mask("(99) 9999-9999?9")
                    .focusout(function (event) {
                        var target, phone, element;
                        target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                        phone = target.value.replace(/\D/g, '');
                        element = $(target);
                        element.unmask();
                        if(phone.length > 10) {
                            element.mask("(99) 99999-999?9");
                        } else {
                            element.mask("(99) 9999-9999?9");
                        }
                    });
                $('.cnpj').mask("99.999.999/9999-99");
                $('.telefone').mask("(99) 9999-9999");
                $('#btn-salvar-cliente').attr('disabled','disabled');
                $('#cpf').focus();
            }
        });
    });
$(".cambio").change(function(){
        calculaSaldo();
    });
});