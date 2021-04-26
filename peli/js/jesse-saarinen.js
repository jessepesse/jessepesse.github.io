/* Tekijä: Jesse Saarinen / TIK21KM */
/// <reference path="jquery-3.6.0.min.js" />

$(function () {
  // tähän kirjoitetaan js-koodi

  let oikein = 0;
  let vastattu = 0;

  // Ensimmäisen kysymyksen js-koodi
  $('.kysymys1').on('click', function () {
    let valittu = $('[name=kysymys1]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
      $("#oikein").html("Sait oikein: " + oikein + " / 5");
      $(this).next().addClass('selected')
      $(this).next().next().slideToggle(1000)
    } else {
      vastattu = vastattu + 1;
      $(this).next().addClass('selected_wrong')
      $(this).next().next().slideToggle(1000)
      $("#right1").addClass('selected')
    }
    $("[name=kysymys1]").prop("disabled", true);
    $("#info1").slideDown(1000);
  })

  // Toisen kysymyksen js-koodi
  $('.kysymys2').on('click', function () {
    let valittu = $('[name=kysymys2]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
      $("#oikein").html("Sait oikein: " + oikein + " / 5");
      $(this).next().addClass('selected')
      $(this).next().next().slideToggle(1000)
    } else {
      vastattu = vastattu + 1;
      $(this).next().addClass('selected_wrong')
      $(this).next().next().slideToggle(1000)
      $("#right2").addClass('selected')
    }
    $("[name=kysymys2]").prop("disabled", true);
    $("#info2").slideDown(1000);
  })

  // Kolmannen kysymyksen js-koodi
  $('.kysymys3').on('click', function () {
    let valittu = $('[name=kysymys3]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
      $("#oikein").html("Sait oikein: " + oikein + " / 5");
      $(this).next().addClass('selected')
      $(this).next().next().slideToggle(1000)
    } else {
      vastattu = vastattu + 1;
      $(this).next().addClass('selected_wrong')
      $(this).next().next().slideToggle(1000)
      $("#right3").addClass('selected')
    }
    $("[name=kysymys3]").prop("disabled", true);
    $("#info3").slideDown(1000);
  })

  // Neljännen kysymyksen js-koodi
  $('.kysymys4').on('click', function () {
    let valittu = $('[name=kysymys4]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
      $("#oikein").html("Sait oikein: " + oikein + " / 5");
      $(this).next().addClass('selected')
      $(this).next().next().slideToggle(1000)
    } else {
      vastattu = vastattu + 1;
      $(this).next().addClass('selected_wrong')
      $(this).next().next().slideToggle(1000)
      $("#right4").addClass('selected')
    }
    $("[name=kysymys4]").prop("disabled", true);
    $("#info4").slideDown(1000);
  })

  $('.kysymys5').on('click', function () {
    let valittu = $('[name=kysymys5]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
      $("#oikein").html("Sait oikein: " + oikein + " / 5");
      $(this).next().addClass('selected')
      $(this).next().next().slideToggle(1000)
    } else {
      vastattu = vastattu + 1;
      $(this).next().addClass('selected_wrong')
      $(this).next().next().slideToggle(1000)
      $("#right5").addClass('selected')
    }
    $("[name=kysymys5]").prop("disabled", true);
    $("#info5").slideDown(1000);
  })


  $("#tarkista").on('click', function(){

     if (vastattu === 5) {
    $(this).addClass('hidden');
    $("[name=kysymykset]").addClass('hidden');
    $("#oikein").removeClass('hidden');
    $("#uusi").removeClass('hidden');
  }
  })
 
  $("#uusi").on('click', function(){
    location.reload();
  })


})
