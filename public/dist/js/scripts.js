if($('.datepick').length > 0) {
    $('.datepick').datepicker({
        format: 'dd/mm/yyyy',
        language: 'pt-BR'
    });
}
if($('.maskDate').length > 0) {
    $('.maskDate').mask("99/99/9999");
}
if($('.cep').length > 0) {
    $('.cep').mask("99999-999");
}

if($('.maskAereo').length > 0) {
    $('.maskAereo').mask("9.9999");
}

if($('.maskTerrestre').length > 0) {
    $('.maskTerrestre').mask("9.99");
}
if($('.cpf').length > 0) {
    $('.cpf').mask("999.999.999-99");
}
if($('.cnpj').length > 0) {
    $('.cnpj').mask("99.999.999/9999-99");
}

if($('#my_frame').length > 0) {
    var height = $(document).height() - 250;
    $('#my_frame').css('height',height + 'px');
}

if($('.dolar').length > 0) {
    $(".dolar").maskMoney({thousands:',', decimal:'.', allowZero: true});
}

if($('#cpf_beneficiario').length > 0) {
    $('#cpf_beneficiario').mask("999.999.999-99");
}

if($('.celular').length > 0) {
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
}

if($('.telefone').length > 0) {
    $('.telefone').mask("(99) 9999-9999");
}
if($('.promotor').length > 0) {
    $( "#promotor" ).autocomplete({
            minLength: 2,
            source: function( request, response ) {
                $.ajax({
                    url: "/promotor/search",
                    dataType: "json",
                    method: 'post',
                    data: {
                        acao: 'autocomplete',
                        term: $('#promotor').val(),
                        '_token':$('input[name=_token]').val()
                    },
                    success: function(data) {
                        console.log("success");
                        console.log(data);
                        response(data);
                    }
                });
            },
            select: function( event, ui ) {
                $("#promotor").val( ui.item.promotor_nome);
                return false;
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( '<li></li>' )
            .data( "item.autocomplete", item )
            .append( "<a><b>" + item.promotor_nome + "</b></a>" )
            .appendTo( ul );
    };
}

function formatDate(date) {
    var data = new Date(date);
    var dia  = data.getDate();
    if (dia< 10) {
        dia  = "0" + dia;
    }
    var mes  = data.getMonth() + 1;
    if (mes < 10) {
        mes  = "0" + mes;
    }
    var ano  = data.getFullYear();
    dataFormatada = dia + "/" + mes + "/" + ano;
    return dataFormatada;
}


/*
if($('.select2').length > 0) {
    $('.select2').select2();
}
*/

function number_format(number, decimals, dec_point, thousands_sep) {
    //   example 8: number_format(67000, 5, ',', '.');
    //   returns 8: '67.000,00000'
    //   example 9: number_format(0.9, 0);
    //   returns 9: '1'
    //  example 10: number_format('1.20', 2);
    //  returns 10: '1.20'
    //  example 11: number_format('1.20', 4);
    //  returns 11: '1.2000'
    //  example 12: number_format('1.2000', 3);
    //  returns 12: '1.200'
    //  example 13: number_format('1 000,50', 2, '.', ' ');
    //  returns 13: '100 050.00'
    //  example 14: number_format(1e-8, 8, '.', '');
    //  returns 14: '0.00000001'

    number = (number + '')
        .replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                    .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
            .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);

}