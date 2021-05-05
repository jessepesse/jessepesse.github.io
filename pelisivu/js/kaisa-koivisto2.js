/// <reference path="jquery-3.6.0.min.js" />

$(function(){

    // Pistelasku
    let total_questions = 0;
    let total_count = 0;

$("#calculate1").on("click", function() {

    // Lukee arvon inputista
    let problem1 = Number($("#result1").val());


    if (problem1 === 77) {
        // jos vastaus on oikein, tulostaa tekstin vastauksen mukaan, muuttaa inputin taustan vihreäksi
        //  ja näyttää Fontawesome ikonin sen mukaan
        // sekä pistelasku
        total_questions = total_questions + 1;
        total_count = total_count + 1;
        $("#print_result1").html("Aivan oikein!");
        $("#result1").addClass("right_label");
        $("[name=right1_1]").show(400);
        $("#final_result1").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );
    } else {
        // jos vastaus on väärä, tulostaa tekstin sen mukaan, muuttaa inputin taustan puaniseksi
        // ja näyttää Fontawesomen ikonen sen mukaan
        // sekä pistelasku
        total_questions = total_questions + 1;
        $("#print_result1").html("Metsään meni! Oikea vastaus on 77.");
        $("#result1").addClass("wrong_label");
        $("[name=wrong1_1]").show(400);
        $("#final_result1").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );
    }

    // Estää muuttamasta vastausta ja siirtää focuksen vastaamisen jälkeen seuraavaan inputiin
    $("#result1").prop("disabled", true);
    $("#result2").trigger("focus");

});

$("#calculate2").on("click", function() {

    let problem2 = Number($("#result2").val());

    if (problem2 === 18) {
        total_questions = total_questions + 1;
        total_count = total_count + 1;
        $("#print_result2").html("Aivan oikein!");
        $("#result2").addClass("right_label");
        $("[name=right2_1]").show(400);
        $("#final_result2").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );

    } else {
        total_questions = total_questions + 1;
        $("#print_result2").html("Metsään meni! Oikea vastaus on 18.");
        $("#result2").addClass("wrong_label");
        $("[name=wrong2_1]").show(400);
        $("#final_result2").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );

    }

    $("#result2").prop("disabled", true);
    $("#result3").trigger("focus");

});



$("#calculate3").on("click", function() {

    let problem3 = Number($("#result3").val());

    if (problem3 === 4) {
        total_questions = total_questions + 1;
         total_count = total_count + 1;
        $("#print_result3").html("Aivan oikein!");
        $("#result3").addClass("right_label");
        $("[name=right3_1]").show(400);
        $("#final_result3").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );
    } else {
        total_questions = total_questions + 1;
        $("#print_result3").html("Metsään meni! Oikea vastaus on 4.");
        $("#result3").addClass("wrong_label");
        $("[name=wrong3_1]").show(400);
        $("#final_result3").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );
    }

    $("#result3").prop("disabled", true);
    $("#result4").trigger("focus");
    

});

$("#calculate4").on("click", function() {

    let problem4 = Number($("#result4").val());

    if (problem4 === 62) {
        total_questions = total_questions + 1;
        total_count = total_count + 1;
        $("#print_result4").html("Aivan oikein!");
        $("#result4").addClass("right_label");
        $("[name=right4_1]").show(400);
        $("#final_result4").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );
    } else {
        total_questions = total_questions + 1;
        $("#print_result4").html("Metsään meni! Oikea vastaus on 62.");
        $("#result4").addClass("wrong_label");
        $("[name=wrong4_1]").show(400);
        $("#final_result4").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );

    }

    $("#result4").prop("disabled", true);
    $("#result5").trigger("focus");
    

});

$("#calculate5").on("click", function() {

    let problem5 = Number($("#result5").val());

    if (problem5 === 31) {
        total_questions = total_questions + 1;
        total_count = total_count + 1;
        $("#print_result5").html("Aivan oikein!");
        $("#result5").addClass("right_label");
        $("[name=right5_1]").show(400);
        $("#final_result5").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );
    } else {
        total_questions = total_questions + 1;
        $("#print_result5").html("Metsään meni! Oikea vastaus on 31.");
        $("#result5").addClass("wrong_label");
        $("[name=wrong5_1]").show(400);
        $("#final_result5").html(total_count + " oikein" + " / " + total_questions + " kysymyksestä" );

    }

    $("#result5").prop("disabled", true);
    $("#result6").trigger("focus");

});

    $("#calculate6").on("click", function() {

    let problem6 = Number($("#result6").val());

    if (problem6 === 9) {
        total_questions = total_questions + 1;
        total_count = total_count + 1;    
        $("#print_result6").html("Aivan oikein!");
        $("#result6").addClass("right_label");
        $("[name=right6_1]").show(400);
        $("#final_result6").html(total_count +  " / " + total_questions + " oikein" );
    } else {
        total_questions = total_questions + 1;
        $("#print_result6").html("Metsään meni! Oikea vastaus on 9.");
        $("#result6").addClass("wrong_label");
        $("[name=wrong6_1]").show(400);
        $("#final_result6").html(total_count + " / " + total_questions + "  oikein" );
    }

    $("#result6").prop("disabled", true);
    $("#result7").trigger("focus");
    

});



});