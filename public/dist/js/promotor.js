$("#promotor_cep").change(function(){
    var cep = $('#promotor_cep').val().replace(/[^\d]+/g,'');
    if (cep != "") {
        $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

            if (!("erro" in dados)) {
                //Atualiza os campos com os valores da consulta.
                $("#promotor_endereco").val(dados.logradouro);
                $("#promotor_bairro").val(dados.bairro);
                $("#promotor_cidade").val(dados.localidade);
                $("#promotor_uf").val(dados.uf);
                $("#promotor_telefone").focus();
            } //end if.
            else {
                //CEP pesquisado não foi encontrado.
                alert("CEP não encontrado.");
            }
        });
    }
});