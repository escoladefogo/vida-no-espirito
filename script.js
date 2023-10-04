document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById('header').removeAttribute("hidden");
        document.getElementById('container').removeAttribute("hidden");

        document.getElementById('c-loader').setAttribute("hidden", "true");
    }, 2000);

    
});

function Form(){
   document.getElementById('text').setAttribute("hidden", "false");
   document.getElementById('form').removeAttribute("hidden");
}
function Ministerio(resposta){
    if (resposta == "Outro") {
        document.getElementById('ministerio').removeAttribute("hidden");
    }else{
        document.getElementById('ministerio').setAttribute("hidden","true");
    };
}
function Criancas(resposta){
    if (resposta == "Sim") {
        document.getElementById('criancas').removeAttribute("hidden");
    }else{
        document.getElementById('criancas').setAttribute("hidden","true");
    };
}

const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
};

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
};


function EnviarDados(nome, telefone, ministerio, outroMinisterio, numCriancas, pagamento, cupom){
    var validado = true;

    var regexTel = new RegExp('(\\(?\\d{2}\\)?\\s)?(\\d{4,5}\\-\\d{4})');
    var tipoIngresso = document.querySelector('input[name="ingresso"]:checked');
    var criancas = document.querySelector('input[name="criancas"]:checked');

    if(nome=="" || nome.length < 8){
        document.getElementById("nome").style.cssText= 'background: #e35858; color: #fff;';
        document.getElementById("nome").focus();
        validado = false;
    }else{
        document.getElementById("nome").style.cssText= 'background: #fff; color: #000;';
    }
    if(!regexTel.test(telefone)){
        document.getElementById("telefone").style.cssText= 'background: #e35858; color: #fff;';
        document.getElementById("telefone").focus();
        validado = false;
    }else{
        document.getElementById("telefone").style.cssText= 'background: #fff; color: #000;';
    }
    if(!(ministerio == "IEF-BH" || ministerio == "IEF-BSB" || ministerio == "IEF-RJ" || ministerio == "IEF-SP" ||outroMinisterio != "")){
        document.getElementById("selectministerio").style.cssText= 'background: #e35858; color: #fff;';
        document.getElementById("ministerio").style.cssText= 'background: #e35858; color: #fff;';
        validado = false;
    }else{
        document.getElementById("selectministerio").style.cssText= 'background: #fff; color: #000;';
        document.getElementById("ministerio").style.cssText= 'background: #fff; color: #000;';
    }if((numCriancas < 1 || numCriancas == null && criancas.value == "Sim") && (criancas != null && criancas.value == "Sim")){
        document.getElementById("numCriancas").style.cssText= 'background: #e35858; color: #fff;';
        validado = false;
    }else{
        document.getElementById("numCriancas").style.cssText= 'background: #fff; color: #000;';
    }if(pagamento == ""){
        document.getElementById("pagamento").style.cssText= 'background: #e35858; color: #fff;';
        validado = false;
    }else{
        document.getElementById("pagamento").style.cssText= 'background: #fff; color: #000;';
    }if(tipoIngresso == null){
        alert("Preencha o tipo do ingresso!");
        validado = false;
    }else{
        tipoIngresso = tipoIngresso.value;
    }


    if(validado){
        Gravar(nome, telefone, ministerio, outroMinisterio, numCriancas, pagamento, cupom, tipoIngresso);
    }
}

function Gravar(nome, telefone, ministerio, outroMinisterio, numCriancas, pagamento, cupom, tipoIngresso){

    document.getElementById('header').setAttribute("hidden", "true");
    document.getElementById('container').setAttribute("hidden", "true");
    document.getElementById('form').setAttribute("hidden", "true");

    document.getElementById('c-loader').removeAttribute("hidden");
    
    fetch("https://sheetdb.io/api/v1/sphncacsye8pr", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        data: [
            {
                'Nome': nome,
                'Telefone': telefone,
                'IEF': ministerio,
                'Ministerio': outroMinisterio,
                'NumCriancas': numCriancas,
                'CupomDesconto': cupom,
                'Pagamento': pagamento,
                'TipoIngresso': tipoIngresso,
            }
        ]
    }),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.created){
            document.getElementById('header').removeAttribute("hidden");
            document.getElementById('container').removeAttribute("hidden");
            document.getElementById('c-loader').setAttribute("hidden", "true");
            document.getElementById('sucesso').removeAttribute("hidden");
        }else{
            alert("Tivemos um erro ao realizar a sua inscrição, favor tentar novamente mais tarde!")
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Tivemos um erro ao realizar a sua inscrição, favor tentar novamente mais tarde!")
    });
 }