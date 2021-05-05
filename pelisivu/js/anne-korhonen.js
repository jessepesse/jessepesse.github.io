/*Anne Korhonen , Web-projekti
            Kevät 2021*/
/// <reference path="jquery-3.6.0.min.js" />
/// <reference path="jquery-3.6.0.min.js" />
$(function(){

    //Pistelaskurin alkuarvot
    let guestion = 0;
    let points = 0;

    //5 kysymystä, jokaiselle oma click-tapahtuma
    //Ensimmäinen kysymys                 
    $("input[name='greeting']").on("click", function(){
        let answerr = Number($(this).val());

        //Vastaus oikein
        if(answerr=== 1){
            //jos vastaus oikea, lisätään väri
            $(this).parent().addClass("choise");
            //ei voi valita, kuin yhden radiobuttonin
            $("[name=greeting]").prop("disabled", true);
            //kysymykseen selittävän tekstin animointi
            $(this).parent().parent().next().toggle(2000);
            //kasvatetaan guestionia ja pointseja
            guestion = guestion + 1;
            points = points + 1;
        } else { //vastaus väärin
            //jos vastaus väärä, lisätään punainen väri ja vihreällä näytetään oikea vastaus
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true"); 
            $(this).parent().parent().next().toggle(2000);
            $("[name=greeting]").prop("disabled", true);
            guestion = guestion + 1;
        }
        //Selittävä teksti esille
        $(this).parent().parent().next().removeClass("hided");
    });

    //Toinen kysymys
    $("input[name='color']").on("click", function(){
        let answerr = Number($(this).val());

        if(answerr=== 1){
            $(this).parent().addClass("choise");
            $("[name=color]").prop("disabled", true);
            $(this).parent().parent().next().toggle(2000);            
            guestion = guestion + 1;
            points = points + 1;
        } else {
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=color]").prop("disabled", true);
            guestion = guestion + 1;
        }
        $(this).parent().parent().next().removeClass("hided");
    });

    //Kolmas kysymys
    $("input[name='day']").on("click", function(){
        let answerr = Number($(this).val());

        if(answerr=== 1){
            $(this).parent().addClass("choise");
            $("[name=day]").prop("disabled", true);
            $(this).parent().parent().next().toggle(2000);
            guestion = guestion + 1;
            points = points + 1;
        } else {
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=day]").prop("disabled", true);
            guestion = guestion + 1;
        }
        $(this).parent().parent().next().removeClass("hided");
    });

    //Neljäs kysymys
    $("input[name='point']").on("click", function(){
        let answerr = Number($(this).val());

        if(answerr=== 1){
            $(this).parent().addClass("choise");
            $("[name=point]").prop("disabled", true);
            $(this).parent().parent().next().toggle(2000);
            guestion = guestion + 1;
            points = points + 1;
        } else {
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=point]").prop("disabled", true);
            guestion = guestion + 1;
        }
        $(this).parent().parent().next().removeClass("hided");
    });

    //Viides kysymys
    $("input[name='house']").on("click", function(){
        let answerr = Number($(this).val());

        if(answerr=== 1){
            $(this).parent().addClass("choise");
            $("[name=house]").prop("disabled", true);
            $(this).parent().parent().next().toggle(2000);
            guestion = guestion + 1;
            points = points + 1;
        } else {
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=house]").prop("disabled", true);
            guestion = guestion + 1;
        }
        $(this).parent().parent().next().removeClass("hided");
    });

    //Pisteet esille klikkaamalla näytä tulos-painiketta
    $("#result").on("click", function(){
        $("#allanswers").html("");

        if(guestion === 5){ //kolme palkintoluokkaa, jos vastannut kaikkiin kysymyksiin
            $("#totalpoints").html("Pisteesi visassa ovat: " + points + " / " + guestion);
            if(points === 5){  //great
                $("#great").removeClass("hided");
                $(this).toggle(2000);
            }
            else if(points <= 4 && points >= 1){  //good
                $("#good").removeClass("hided");
                $(this).toggle(2000);
            } 
            else if(points === 0){  //fail
                $("#fail").removeClass("hided");
                $(this).toggle(2000);
            }
        } else {  //ei ole vastannut viiteen kysymykseen,näytölle kehote vastata jokaiseen
            $("#allanswers").html("Vastaa jokaiseen kysymykseen, jotta näet tuloksen.");
        }
    });
});