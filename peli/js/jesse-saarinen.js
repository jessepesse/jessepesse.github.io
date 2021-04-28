/* Tekijä: Jesse Saarinen / TIK21KM */
/// <reference path="jquery-3.6.0.min.js" />

$(function () {


  let oikein = 0;
  let vastattu = 0;

  // Ensimmäisen kysymyksen js-koodi
  $('.kysymys1').on('click', function () {
    let valittu = $('[name=kysymys1]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
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
    $("#tarkista2").html("")
  })

  // Toisen kysymyksen js-koodi
  $('.kysymys2').on('click', function () {
    let valittu = $('[name=kysymys2]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
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
    $("#tarkista2").html("")
  })

  // Kolmannen kysymyksen js-koodi
  $('.kysymys3').on('click', function () {
    let valittu = $('[name=kysymys3]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
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
    $("#tarkista2").html("")
  })

  // Neljännen kysymyksen js-koodi
  $('.kysymys4').on('click', function () {
    let valittu = $('[name=kysymys4]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
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
    $("#tarkista2").html("")
  })

  // Viidennen kysymyksen js-koodi
  $('.kysymys5').on('click', function () {
    let valittu = $('[name=kysymys5]:checked').val()

    if (valittu === "1") {
      oikein = oikein + 1;
      vastattu = vastattu + 1;
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
    $("#tarkista2").html("")
  })

  // Vastausten tarkistuksen click-tapahtuma
  $("#tarkista").on('click', function(){
    $("#tarkista2").html("")

    if (vastattu === 5) {
    $(this).addClass('hidden');
    $("#oikein").html("Sait oikein: " + oikein + " / 5");
    $("[name=kysymykset]").slideUp(2000);
    $("#oikein").removeClass('hidden');
    $("#uusi").removeClass('hidden');
    if (oikein === 5) {
      $("#palkinnot").append("<img class='img-fluid' src='img/award-1.png'/>")
    } if (oikein === 4) { 
      $("#palkinnot").append("<img class='img-fluid' src='img/award-2.png'/>")
      } if (oikein === 3) { 
        $("#palkinnot").append("<img class='img-fluid' src='img/award-3.png'/>")
      }
    } else {
      $("#tarkista2").html("Et vielä vastannut kaikkiin kysymyksiin!");
    }
  })
 
  // Yritä uudelleen click-tapahtuma
  $("#uusi").on('click', function(){
    location.reload();
  })
})
