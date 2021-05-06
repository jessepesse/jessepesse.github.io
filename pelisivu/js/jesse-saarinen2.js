/* Tekijä: Jesse Saarinen / TIK21KM */
/// <reference path="jquery-3.6.0.min.js" />

$(function () {
  // Random number function
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  oikein = 0;
  vaarin = 0;
  kysymykset = 0;

  $("#aloita").on("click", function () {
    let valittu = $("[name=laskut]:checked").val();

    if (valittu === "1") {
      let k1 = getRndInteger(1, 25);
      let k2 = getRndInteger(1, 25);
      v_1 = k1 + k2;
      $("#kysymys1").slideDown(1000);
      $("#kysymys_1").html(k1 + "+" + k2);
      $(this).slideUp(1000);
      $("#tietoa").slideUp(1000);
    } else if (valittu === "2") {
      let k1 = getRndInteger(10, 50);
      let k2 = getRndInteger(1, 10);
      v_1 = k1 - k2;
      $("#kysymys2").slideDown(1000);
      $("#kysymys_2").html(k1 + "-" + k2);
      $(this).slideUp(1000);
      $("#tietoa").slideUp(1000);
    } else if (valittu === "3") {
      let k1 = getRndInteger(1, 10);
      let k2 = getRndInteger(1, 10);
      v_1 = k1 * k2;
      $("#kysymys3").slideDown(1000);
      $("#kysymys_3").html(k1 + "*" + k2);
      $(this).slideUp(1000);
      $("#tietoa").slideUp(1000);
    }
  });

  /* Yhteenlaskun js-koodi */
  $("#painike1").on("click", function () {
    let v1 = Number($("#vastaus1").val());
    $(this).prop("disabled", true);
    $("#vastaus1").prop("disabled", true);
    $("#seuraava_painike").show(0);

    kysymykset = kysymykset + 1;

    if (v1 === v_1) {
      oikein = oikein + 1;
      $("#ok1").html(
        "Oikein! " + "Olet vastannut oikein " + oikein + " kysymykseen!"
      );
    } else {
      vaarin = vaarin + 1;
      $("#ok1").html("Väärin meni!");
      $("#vaara1").show(0);
      $("#vaara1").html("Oikea vastaus on " + v_1);
    }
  });

  $("#vastaus1").on("focus", function () {
    this.select();
  });

  $("#seuraava_painike").on("click", function () {
    $("#ok1").html("");
    $(this).hide(0);
    $("#painike1").prop("disabled", false);
    $("#vastaus1").prop("disabled", false);
    $("#vaara1").hide(0);
    $("#vastaus1").trigger("focus");
    $("#vastaus1").val("");

    if (kysymykset < 5) {
      let k1 = getRndInteger(1, 25);
      let k2 = getRndInteger(1, 25);
      v_1 = k1 + k2;
      $("#kysymys_1").html(k1 + "+" + k2);
    } else if (kysymykset < 10) {
      let k1 = getRndInteger(1, 50);
      let k2 = getRndInteger(1, 50);
      v_1 = k1 + k2;
      $("#kysymys_1").html(k1 + "+" + k2);
    } else if (kysymykset === 10) {
      $("#vaara1").hide(0);
      $("#kysymys1").hide(0);
      $("#vika").show(0);
      $("#vika_kysymykset").html(kysymykset);
      $("#vika_ok").html(oikein);
      $("#vika_vaara").html(vaarin);
    }
  });

  /* Vähennyslaskun js-koodi */
  $("#painike2").on("click", function () {
    let v1 = Number($("#vastaus2").val());
    $(this).prop("disabled", true);
    $("#vastaus2").prop("disabled", true);
    $("#seuraava_painike2").show(0);

    kysymykset = kysymykset + 1;

    if (v1 === v_1) {
      oikein = oikein + 1;
      $("#ok2").html(
        "Oikein! " + "Olet vastannut oikein " + oikein + " kysymykseen!"
      );
    } else {
      vaarin = vaarin + 1;
      $("#ok2").html("Väärin meni!");
      $("#vaara2").show(0);
      $("#vaara2").html("Oikea vastaus on " + v_1);
    }
  });

  $("#vastaus2").on("focus", function () {
    this.select();
  });

  $("#seuraava_painike2").on("click", function () {
    $("#ok2").html("");
    $(this).hide(0);
    $("#painike2").prop("disabled", false);
    $("#vastaus2").prop("disabled", false);
    $("#vaara2").hide(0);
    $("#vastaus2").trigger("focus");
    $("#vastaus2").val("");

    if (kysymykset < 5) {
      let k1 = getRndInteger(10, 50);
      let k2 = getRndInteger(1, 10);
      v_1 = k1 - k2;
      $("#kysymys_2").html(k1 + "-" + k2);
    } else if (kysymykset < 10) {
      let k1 = getRndInteger(50, 100);
      let k2 = getRndInteger(1, 50);
      v_1 = k1 - k2;
      $("#kysymys_2").html(k1 + "-" + k2);
    } else if (kysymykset === 10) {
      $("#vaara2").hide(0);
      $("#kysymys2").hide(0);
      $("#vika").show(0);
      $("#vika_kysymykset").html(kysymykset);
      $("#vika_ok").html(oikein);
      $("#vika_vaara").html(vaarin);
    }
  });

  /* Kertolaskun js-koodi*/
  $("#painike3").on("click", function () {
    let v1 = Number($("#vastaus3").val());
    $(this).prop("disabled", true);
    $("#vastaus3").prop("disabled", true);
    $("#seuraava_painike3").show(0);

    kysymykset = kysymykset + 1;

    if (v1 === v_1) {
      oikein = oikein + 1;
      $("#ok3").html(
        "Oikein! " + "Olet vastannut oikein " + oikein + " kysymykseen!"
      );
    } else {
      vaarin = vaarin + 1;
      $("#ok3").html("Väärin meni!");
      $("#vaara3").show(0);
      $("#vaara3").html("Oikea vastaus on " + v_1);
    }
  });

  $("#vastaus3").on("focus", function () {
    this.select();
  });

  $("#seuraava_painike3").on("click", function () {
    $("#ok3").html("");
    $(this).hide(0);
    $("#painike3").prop("disabled", false);
    $("#vastaus3").prop("disabled", false);
    $("#vaara3").hide(0);
    $("#vastaus3").trigger("focus");
    $("#vastaus3").val("");

    if (kysymykset < 5) {
      let k1 = getRndInteger(1, 5);
      let k2 = getRndInteger(1, 5);
      v_1 = k1 * k2;
      $("#kysymys_3").html(k1 + "*" + k2);
    } else if (kysymykset < 10) {
      let k1 = getRndInteger(1, 12);
      let k2 = getRndInteger(10, 12);
      v_1 = k1 * k2;
      $("#kysymys_3").html(k1 + "*" + k2);
    } else if (kysymykset === 10) {
      $("#vaara3").hide(0);
      $("#kysymys3").hide(0);
      $("#vika").show(0);
      $("#vika_kysymykset").html(kysymykset);
      $("#vika_ok").html(oikein);
      $("#vika_vaara").html(vaarin);
    }
  });
   // Yritä uudelleen click-tapahtuma
   $("#uusi").on('click', function(){
    location.reload();
  })


});
