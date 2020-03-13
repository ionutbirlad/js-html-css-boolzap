$(document).ready(function() {

  // DA RIPETERE SOLO UNA VOLTA ==> serve per la funzione messageGenerator()
  var source = $("#template").html();
  var template = Handlebars.compile(source);
  // DA RIPETERE SOLO UNA VOLTA

  // DA RIPETERE SOLO UNA VOLTA ==> serve per la funzione addContact()
  var source2 = $("#template-2").html();
  var templateItem = Handlebars.compile(source2);
  // DA RIPETERE SOLO UNA VOLTA

  // Scroll down automatico
    scroll(".main.active");
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


  // AGGIUNTA CONTATTO
    // Gestione click
    $(".fas.fa-comment-alt").click(function() {
      $(".aggiunta-contatto").toggle();
    });
    // Fine gestione click

    // Gestione aggiunta
    $("#aggiunta-contatto-text").keypress(function(event) {
      if (event.keyCode == 13) {
        var nomeContatto = $("#aggiunta-contatto-text").val().toLowerCase();
        // console.log(nomeContatto);
        $("#aggiunta-contatto-text").val("");
        $(".aggiunta-contatto").hide();
        var sentinella = false;
        $(".contatti .item").each(function() {
          if ($(this).find("h6").text().toLowerCase().includes(nomeContatto)) {
            sentinella = true;
          }
        })
        if (sentinella == false) {
          addContact(nomeContatto);

          // VECCHIO METODO
          // var cloneItem = $(".template-2 .item").clone();
          // cloneItem.find("h6").text(nomeContatto);
          // $(".left .contatti").append(cloneItem);
          // VECCHIO METODO

        } else {
          alert("Questo contatto è già presente nella rubrica");
        }
      }
    })
    // Fine gestione aggiunta
  // FINE AGGIUNTA CONTATTO


  // Selezione CONVERSAZIONI
    $(".item").click(function() {
      var nome = $(this).find("h6").text();
      var img = $(this).children("img").attr("src");
      // console.log(img);
      var utente = $(this).data("conversazione");
      $(".main").each(function() {
        if (utente == $(this).data("conversazione")) {
          var ultimoAccesso = $(this).children(".main .active .row:last-child").find(".received .message-time").text();
          // console.log(ultimoAccesso);
          $(".main").removeClass("active");
          $(this).addClass("active");
          $(".right .top .lft").find("img").attr("src", img);
          $(".right .top .lft").find("h6").text(nome);
          $(".right .top .lft").find(".accesso").text(ultimoAccesso);
        }
      });
    });
  // Fine selezione CONVERSAZIONI


  // "DATABASE" messaggi iniziali
    var databaseMessaggi = {
      c0: [
        {
          text: "Ciao Samuele tutto bene?",
          direction: "sent"
        },
        {
          text: "Si dai non c'é male",
          direction: "received"
        }
      ],
      c1: [
        {
          text: "Ciao Fabio tutto bene?",
          direction: "sent"
        },
        {
          text: "Si dai non c'é male",
          direction: "received"
        }
      ],
      c2: [
        {
          text: "Ciao Riccardo tutto bene?",
          direction: "sent"
        },
        {
          text: "Si dai non c'é male",
          direction: "received"
        }
      ],
      c3: [
        {
          text: "Ciao Marco tutto bene?",
          direction: "sent"
        },
        {
          text: "Si dai non c'é male",
          direction: "received"
        }
      ],
      c4: [
        {
          text: "Ciao Giorgio tutto bene?",
          direction: "sent"
        },
        {
          text: "Si dai non c'é male",
          direction: "received"
        }
      ],
      c5: [
        {
          text: "Ciao Paolo tutto bene?",
          direction: "sent"
        },
        {
          text: "Si dai non c'é male",
          direction: "received"
        }
      ],
      c6: [
        {
          text: "Ciao Francesco tutto bene?",
          direction: "sent"
        },
        {
          text: "Si dai non c'é male",
          direction: "received"
        }
      ],
      c7: [
        {
          text: "Ciao Nicola tutto bene?",
          direction: "sent"
        },
        {
          text: "Si dai non c'é male",
          direction: "received"
        }
      ]
    };

    for (var key in databaseMessaggi) {
      var numeroConversazione = key[1];
      for (var i = 0; i < key.length; i++) {
        // console.log(databaseMessaggi[key][i].text);
        var messaggio = databaseMessaggi[key][i].text;
        // console.log(messaggio);
        var sentOReceived = databaseMessaggi[key][i].direction;
        // console.log(sentOReceived);
        var conversazione = $(".main[data-conversazione='" + numeroConversazione + "']");
        // console.log(conversazione);
        messageGenerator(messaggio, sentOReceived, conversazione);

      }
    }
  // Fine "DATABASE" messaggi iniziali


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

    // OPZIONI MESSAGGIO
      // Questo mi serve per attivare al click anche gli elementi generati dall'utente
      $(".main").on('click', ".opt", function() {

        if ($(this).find(".message-options-panel").hasClass("options-active")) {
          $(this).find(".message-options-panel").removeClass("options-active");
        } else {
          $(".main .message-options-panel").removeClass("options-active");
          $(this).find(".message-options-panel").toggleClass("options-active");
        }

      })
    // FINE OPZIONI MESSAGGIO

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
      // console.log(messaggioInserito);
      if (messaggioInserito.trim().length > 0) {
        $("#msg").val("");
        messageGenerator(messaggioInserito, "sent", ".main.active");
        scroll(".main.active");
        setTimeout(function() {
          messageGenerator("ok", "received", ".main.active");
          scroll(".main.active");
        }, 1000);
      }
    }

  // Funzione per creare il messaggio

    // HANDLEBARS

    function messageGenerator(text, sentReceived, corrispondenza) {
      var infoMessaggio = {
        direzione: sentReceived,
        messaggio: text,
        ora: new Date().getHours() + ":" + new Date().getMinutes()
      };
      var templateCompiled = template(infoMessaggio);
      $(corrispondenza).append(templateCompiled);
    }
    // HANDLEBARS

    // METODO VECCHIO

    // function messageGenerator(text, sentReceived) {
    //   var templateClone = $(".template .row").clone();
    //   templateClone.find(".message-text").text(text);
    //   templateClone.find(".message-time").text(new Date().getHours() + ":" + new Date().getMinutes());
    //   templateClone.children(".message").addClass(sentReceived);
    //   $(".main.active").append(templateClone);
    // }

    // METODO VECCHIO


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


    // Funzione per aggiungere nuovo contatto con Handlebars
    // DA RIPETERE SOLO UNA VOLTA
    var source2 = $("#template-2").html();
    var templateItem = Handlebars.compile(source2);
    // DA RIPETERE SOLO UNA VOLTA

    function addContact(nm) {
      var infoNuovoContatto = {
        nome: nm
      };
      var templateCompiled = templateItem(infoNuovoContatto);
      $(".left .contatti").append(templateCompiled);
    }


  // Fine parte delle FUNZIONI





});
