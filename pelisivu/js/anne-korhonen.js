/*Anne Korhonen , Web-projekti
            Kevät 2021*/
/// <reference path="jquery-3.6.0.min.js" />
$(function(){

    //5 kysymystä, jokaiselle oma click-tapahtuma
    //Ensimmäinen kysymys
    $("input[name='greeting']").on("click", function(){
        //oikean ja väärän vastauksen osoittaminen
        let answerr = Number($(this).val());

        if(answerr=== 1){
            //jos vastaus oikea, lisätään väri
            $(this).parent().addClass("choise");
            //ei voi valita, kuin yhden radiobuttonin
            $("[name=greeting]").prop("disabled", true);
            //kysymykseen selittävän tekstin animointi
            $(this).parent().parent().next().toggle(2000);
        } else {
            //jos vastaus väärä, lisätään väri
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=greeting]").prop("disabled", true);
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
        } else {
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=color]").prop("disabled", true);
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
        } else {
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=day]").prop("disabled", true);
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
        } else {
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=point]").prop("disabled", true);
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
        } else {
            $(this).parent().addClass("false");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("true");
            $(this).parent().parent().next().toggle(2000);
            $("[name=house]").prop("disabled", true);
        }
        $(this).parent().parent().next().removeClass("hided");
    });


});