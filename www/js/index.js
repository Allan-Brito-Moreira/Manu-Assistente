//assim que a rota começar
//VERIFICAR SE TEM PERMISSÃO DE USAR SPPERCHCOGINISHAM
window.plugins.speechRecognition.hasPermission(
  function(permissao){
    if(!permissao){
      //solicitar permissao 
      window.plugins.speechRecognition.requestPermission(
        function(temPermissao){
          app.dialog.alert('Permissão Concedida: '+temPermissao);
        }, function(erro){
          app.dialog.alert('Request Permission error'+erro);
        })
    }
  }, function(error){
    app.dialog.alert('hasPermission error'+error);
  })
//clicou no botão falar
$("BtnFalar").on('click',function(){
    let options = {
        language: "pt-BR",
        
        showPopup: false,
        showPartial: true
      }
       //começou a escutar
      window.plugins.speechRecognition.startListening(
        //se sucesso
        function(dados){
          $.each(dados, function(index,texto){
            //colocar o que ela entende no p chamado pergunta
            $("#pergunta").html("").append(texto);
            //pegar o valor do que ela entendeu
            var pergunta = $("pergunta").html().toLowerCase();
            //verificar se o comando é esse
            if(pergunta=="acessar memórias" || pergunta=="acessar memória"){
              app.views.main.router.navigate('/memorias/'); 
            }

            if(pergunta=="qual é seu nome" || pergunta=="seu nome"){
              // or with more options
                TTS.speak({
                  text: 'meu nome é Manu',
                  locale: 'pt-BR',
                  rate: 0.75
              }, function () {
                //se ela falar vai escrever na tela a resposta
                var typed = new Typed('#resposta', {
                  strings: ['meu nome é Manu ^1000', ''],
                  typeSpeed: 40,
                  showCursor: false,
                  //calback da conclusão da fala
                  onComplete: function (self){
                    toastBottom = app.toast.create({
                      text: 'Fala concluída com sucesso',
                      closeTimeout: 2000,
                    });
                    toastBottom.open();
                  }
              });
                  
              }, function (erro) {
                  app.dialog.alert('Houve um erro: '+erro)
              });
            }
          })

        },
        //se der erro
         function(erro){
            app.dialog.alert('Houve um erro: '+erro);

        },  options)
});