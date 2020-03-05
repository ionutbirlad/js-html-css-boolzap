$(document).ready(function() {

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
        messaggio.find('.orario').text(hours + ":" + min);
        $('.main').append(messaggio); // Aggiungo in fondo alla lista nomi il messaggio

        // Ricevimento del messaggio dopo 1 secondo
        setTimeout(function() {
          var messaggioDiRisposta = $('.template2 .row').clone();
          messaggioDiRisposta.find('.received .testo-messaggio').text("ok");
          $('.main').append(messaggioDiRisposta);

          // Scroll down automatico ==> da migliorare
          $(".main").animate({ scrollTop: "300px" });
        }, 1000);
        
        // Scroll down automatico ==> da migliorare
        $(".main").animate({ scrollTop: "300px" });

    });









});
