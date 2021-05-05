/*Anne Korhonen , Web-projekti
            Kevät 2021*/
/// <reference path="jquery-3.6.0.min.js" />

$(function(){

    let guestion = 0;
    let points = 0;

    //Ensimmäinen tehtävä
    $(".one").on("click", function(){

        //let answer = Number($(this).val());

        //vastaus oikein
        if(answer === 1){

            guestion = guestion + 1;
            points = points + 1;

        } else { //vastaus väärin

            guestion = guestion + 1;
        }
        $("[name=one]").prop("disabled", true);
    });

    //Toinen tehtävä
    $(".one").on("click", function(){

    });

    //Kolmas tehtävä
    $(".one").on("click", function(){

    });

    //Neljäs tehtävä
    $(".optradio").on("click", function(){

        //vastaus oikein
        if(answer === 1){

            guestion = guestion + 1;
            points = points + 1;

        } else { //vastaus väärin

            guestion = guestion + 1;
        }
    });

    //Viides tehtävä
    $(".one").on("click", function(){

    });
});