$(document).ready(function() {
  
  // Scroll down automatico
  $(".main").animate({
              scrollTop: $(
                '.main').get(0).scrollHeight
          }, 1000);

  var time = new Date();
  var hours = time.getHours()
  var min = time.getMinutes()
  // var n = d.toLocaleTimeString();

  $('.fa-paper-plane').click(function(){
        var nomeInput = $('#msg').val();
        $('#msg').val('');
        // $('#nome-utente').html('<span class="rosso">' + nomeInput + '</span>');
        // $('#nome-utente').text('<span class="rosso">' + nomeInput + '</span>');
        // $('#nome-utente').text(nomeInput).attr('class', 'rosso').css('background-color', 'yellow');
        // $('.lista-nomi').append('<div>' + nomeInput + '</div>');
        var messaggio = $('.template .row').clone(); // Copia del contenuto del messaggio che è dentro al template (display none nel nostro CSS)
        messaggio.find('.sent .testo-messaggio').text(nomeInput); // Modifico il testo messaggio nel messaggio
        messaggio.find('.orario').text(new Date().getHours() + ":" + new Date().getMinutes());
        $('.main').append(messaggio); // Aggiungo in fondo alla lista nomi il messaggio

        // Ricevimento del messaggio dopo 1 secondo
        setTimeout(function() {
          var messaggioDiRisposta = $('.template2 .row').clone();
          messaggioDiRisposta.find('.received .testo-messaggio').text("ok");
          messaggioDiRisposta.find('.orario').text(new Date().getHours() + ":" + new Date().getMinutes());
          $('.main').append(messaggioDiRisposta);

          // Scroll down automatico ==> da migliorare
          $(".main").animate({
                      scrollTop: $(
                        '.main').get(0).scrollHeight
                  }, 1000);
        }, 1000);

        // Scroll down automatico ==> da migliorare
        $(".main").animate({
                    scrollTop: $(
                      '.main').get(0).scrollHeight
                }, 1000);
    });

    $(".search-txt").keyup(function(event) {
      var carattereInserito = $(this).val().toLowerCase();
      // console.log(carattereInserito);
      $(".contatti .item .nm h6").each(function() {
        if ($(this).text().toLowerCase().includes(carattereInserito)) {
          $(this).parents(".contatti .item").show("fast");
        } else {
          $(this).parents(".contatti .item").hide("fast");
        }
      });
    });







});
