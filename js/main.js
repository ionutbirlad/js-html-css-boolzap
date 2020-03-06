$(document).ready(function() {

  // Scroll down automatico
    scroll(".main");
  // Fine scroll down automatico


  // Ricerca CONTATTI
    $(".search-txt").keyup(function(event) {
      var carattereInserito = $(this).val().toLowerCase();
      $(".contatti .item .nm h6").each(function() {
        if ($(this).text().toLowerCase().includes(carattereInserito)) {
          $(this).parents(".contatti .item").show("fast");
        } else {
          $(this).parents(".contatti .item").hide("fast");
        }
      });
    });
  // Fine ricerca CONTATTI


  // Ricerca MESSAGGI
    $(".cerca input").keyup(function(event) {
      var carattereImmesso = $(this).val().toLowerCase();
      // console.log(carattereInserito);
      $(".main .row").each(function() {
        if ($(this).text().toLowerCase().includes(carattereImmesso)) {
          $(this).show("fast");
        } else {
          $(this).hide("fast");
        }
      });
    });
  // Fine ricerca MESSAGGI


  // Parte GESTIONE MESSAGGI
    $(".msg .ir").click(function() {
      textSend();
    });
    $("#msg").keypress(function(event) {
      if (event.keyCode == 13) {
        textSend();
      }
    });
  // Fine parte GESTIONE MESSAGGI

  // FOCUS/BLUR messaggi
    $("#msg").focus(function() {
      $(".ir").children("i").toggleClass("fas fa-microphone fas fa-paper-plane");
    }).blur(function() {
      $(".ir").children("i").toggleClass("fas fa-microphone fas fa-paper-plane");
    });
  // Fine FOCUS/BLUR messaggi


  // Finestra EMOTICONS
    $(".far.fa-smile").click(function() {
      if ($(".emtc .emoticons").is(":visible")) {
        $(".emtc .emoticons").toggle();
      } else {
        $(".is .cerca").hide();
        $(".emtc .emoticons").toggle();
      }
    });
  // Fine finestra EMOTICONS

  // Finestra RICERCA CHAT
    $(".fas.fa-search").click(function() {
      if ($(".is .cerca").is(":visible")) {
        $(".is .cerca").toggle();
      } else {
        $(".emtc .emoticons").hide();
        $(".is .cerca").toggle();
      }
    });
  // Fine finestra RICERCA CHAT




  // Parte delle FUNZIONI

  // Funzione per l'invio dei messaggi
    function textSend() {
      var messaggioInserito = $("#msg").val();
      console.log(messaggioInserito);
      if (messaggioInserito.trim().length > 0) {
        $("#msg").val("");
        messageGenerator(messaggioInserito, "sent");
        scroll(".main");
        setTimeout(function() {
          messageGenerator("ok", "received");
          scroll(".main");
        }, 1000);
      }
    }

  // Funzione per creare il messaggio
    function messageGenerator(text, sentReceived) {
      var templateClone = $(".template .row").clone();
      templateClone.find(".message-text").text(text);
      templateClone.find(".message-time").text(new Date().getHours() + ":" + new Date().getMinutes());
      templateClone.children(".message").addClass(sentReceived);
      $(".main").append(templateClone);
    }

  // Funzione generica per lo scroll totale

  // Alternativa di Luca ==> non funziona perfettamente

    /*
    function scroll(yourDiv) {
      var pixelScroll = $(yourDiv).height();
      $(yourDiv).scrollTop(pixelScroll);
    }
    */

  // Alternativa con animazione
    function scroll(yourDiv) {
      $(yourDiv).animate({scrollTop:
       $(yourDiv).get(0).scrollHeight
      }, 1000);
    }

  // Fine parte delle FUNZIONI





});
