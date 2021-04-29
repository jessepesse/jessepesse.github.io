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
    let k1 = getRndInteger(1, 100);
    let k2 = getRndInteger(1, 100);

    v_1 = k1 + k2;

    $("#kysymys1").slideDown(1000);
    $("#kysymys_1").html(k1 + "+" + k2);
    $(this).slideUp(1000);
    $("#tietoa").slideUp(1000);
  });

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
    let k1 = getRndInteger(1, 100);
    let k2 = getRndInteger(1, 100);

    v_1 = k1 + k2;

    if (kysymykset < 5) {
      $("#kysymys_1").html(k1 + "+" + k2);
    } else if (kysymykset >= 5 && kysymykset < 10) {
      $("#kysymys_1").html(k1 + "-" + k2);
      v_1 = k1 - k2;
    } else if (kysymykset >= 10 && kysymykset <= 15) {
      let k1 = getRndInteger(1, 10);
      let k2 = getRndInteger(1, 10);
      $("#kysymys_1").html(k1 + "*" + k2);
      v_1 = k1 * k2;
    } else if (kysymykset === 16) {
      $("#vaara1").hide(0);
      $("#kysymys1").hide(0);
      $("#vika").show(0);
      $("#vika_kysymykset").html(kysymykset);
      $("#vika_ok").html(oikein);
      $("#vika_vaara").html(vaarin);
    }

    $("#ok1").html("");
    /* $("#kysymys_1").html(k1 + "+" + k2); */
    $(this).hide(0);
    $("#painike1").prop("disabled", false);
    $("#vastaus1").prop("disabled", false);
    $("#vaara1").hide(0);
    $("#vastaus1").trigger("focus");
  });

  /* $("#seuraava_painike").on("click", function(){
        let k1 = getRndInteger(1, 100);
        let k2 = getRndInteger(1, 100);

        v_2 = k1 - k2;
        $("#kysymys2").show(0);
        $("#kysymys_2").html(k1 + "-" + k2);
        $(this).hide(0);
        $("#kysymys1").hide(0);

    });

    $("#painike2").on("click", function(){
        let v1 = Number($("#vastaus1").val());
        $(this).prop("disabled", true);
        $("#seuraava_painike2").slideDown(1000)

        if (v1 === v_1) {
            $("#ok2").html("oikein!");
        } else {
            $("#ok2").html("väärin!");
            $("#vaara2").show(1);
            $("#vaara2").html("Oikea vastaus on " + v_1);
        }
    });

    $("#seuraava_painike2").on("click", function(){
        let k1 = getRndInteger(1, 100);
        let k2 = getRndInteger(1, 100);

        v_2 = k1 - k2;
        $("#kysymys2").show(0);
        $("#kysymys_2").html(k1 + "-" + k2);
        $(this).hide(0);
        $("#kysymys1").hide(0);

    });
 */
});
