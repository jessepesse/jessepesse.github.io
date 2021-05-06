/// <reference path="jquery-3.6.0.min.js" />

$(function(){
 
    // Pohja-arvo muuttujassa
    let answer = 0;
    let final_results = 0;
 
    // Pistelaskuun alkuarvot
    let total_questions = 0;
    let total_count = 0;

    // Kysymys 1
    // Oikea vastaus #q1a
    $(".question_a").on("click", function(){

        // luetaan arvo valitusta vastauksesta
        let answered = $("[name=question_a]:checked").val();    

        // jos arvo on 1 = oikea vastaus
        // pistelasku
        if (answered === "1") {
        answer = answer + 1;
        total_questions = total_questions + 1;
        total_count = total_count + 1;
        // tuo valintaa css-valitut muotoilut ja tulostaa kuvan sekä selitteen
            $("#q1a + label").addClass("selected_ohyes");
            $("[name=right1_1]").show(400);
            
                     

    
        // väärät vaihtoehdot jos arvo on 2 tai 3    
        } else if (answered === "2") {
         answer = answer + 2;
         total_questions = total_questions + 1
        // näyttää että väärä vastaus sekä näyttää oikean vastauksen ja valinnan mukaisen kuvan ja selitteen
            $("#q1b + label").addClass("selected_nope");
            $("#q1a + label").addClass("selected_ohyes");
            $("[name=wrong1_1]").show(400);
           

        } else {
         answer = answer + 3;
         total_questions = total_questions + 1;
        // näyttää että väärä vastaus sekä näyttää oikean vastauksen ja valinnan mukaisen kuvan ja selitteen 
            $("#q1c + label").addClass("selected_nope");
            $("#q1a + label").addClass("selected_ohyes");
            $("[name=wrong1_2]").show(400);
         
        }

        //Estää valitsemasta useamman
        $("#q1a").prop("disabled", true);
        $("#q1b").prop("disabled", true);
        $("#q1c").prop("disabled", true);

        

    
    });

    // Kysymys 2
    // Oikea vastaus #q2c
    
    $(".question_b").on("click", function(){

        let answered = $("[name=question_b]:checked").val();

        if (answered === "1") {
         answer = answer + 1;
         total_questions = total_questions + 1;
         total_count = total_count + 1;
            $("#q2c + label").addClass("selected_ohyes");
            $("[name=right2_1]").show(400);
           

        } else if (answered === "2") {
         answer = answer + 2;
         total_questions = total_questions + 1;
            $("#q2b + label").addClass("selected_nope");
            $("#q2c + label").addClass("selected_ohyes");
            $("[name=wrong2_1]").show(400);

        } else {
         answer = answer + 3;
         total_questions = total_questions + 1;
            $("#q2a + label").addClass("selected_nope");
            $("#q2c + label").addClass("selected_ohyes");
            $("[name=wrong2_2]").show(400);
        }

        $("#q2a").prop("disabled", true);
        $("#q2b").prop("disabled", true);
        $("#q2c").prop("disabled", true);

    
    });

    // Kysymys 3
    // Oikea vastaus #q3b

    $(".question_c").on("click", function(){

        // luetaan arvo valitusta vaihtoehdosta
        let answered = $("[name=question_c]:checked").val();

        if (answered === "1") {
         answer = answer + 1;
         total_questions = total_questions + 1;
         total_count = total_count + 1;
            $("#q3b + label").addClass("selected_ohyes");
            $("[name=right3_1]").show(400);

        } else if (answered === "2") {
         answer = answer + 2;
         total_questions = total_questions + 1;
            $("#q3a + label").addClass("selected_nope");
            $("#q3b + label").addClass("selected_ohyes");
            $("[name=wrong3_1]").show(400);

        } else {
         answer = answer + 3;
         total_questions = total_questions + 1;
            $("#q3c + label").addClass("selected_nope");
            $("#q3b + label").addClass("selected_ohyes");
            $("[name=wrong3_2]").show(400);
        }

        $("#q3a").prop("disabled", true);
        $("#q3b").prop("disabled", true);
        $("#q3c").prop("disabled", true);

    
    });

    // Kysymys 4
    // Oikea vastaus #q4c

    $(".question_d").on("click", function(){

        // luetaan arvo valitusta vaihtoehdosta
        let answered = $("[name=question_d]:checked").val();

        if (answered === "1") {
         answer = answer + 1;
         total_questions = total_questions + 1;
         total_count = total_count + 1;
            $("#q4c + label").addClass("selected_ohyes");
            $("[name=right4_1]").show(400);
  

        } else if (answered === "2") {
         answer = answer + 2;
         total_questions = total_questions + 1;
            $("#q4b + label").addClass("selected_nope");
            $("#q4c + label").addClass("selected_ohyes");
            $("[name=wrong4_1]").show(400);

        } else {
         answer = answer + 3;
         total_questions = total_questions + 1;
            $("#q4a + label").addClass("selected_nope");
            $("#q4c + label").addClass("selected_ohyes");
            $("[name=wrong4_2]").show(400);
        }

        $("#q4a").prop("disabled", true);
        $("#q4b").prop("disabled", true);
        $("#q4c").prop("disabled", true);

    
    });

    // Kysymys 5
    // Oikea vastaus #q5b

    $(".question_e").on("click", function(){

        // luetaan arvo valitusta vaihtoehdosta
        let answered = $("[name=question_e]:checked").val();

        if (answered === "1") {
         answer = answer + 1;
         total_questions = total_questions + 1;
         total_count = total_count + 1;
            $("#q5b + label").addClass("selected_ohyes");
            $("[name=right5_1]").show(400);
      

        } else if (answered === "2") {
         answer = answer + 2;
         total_questions = total_questions + 1;
            $("#q5a + label").addClass("selected_nope");
            $("#q5b + label").addClass("selected_ohyes");
            $("[name=wrong5_1]").show(400);

        } else {
         answer = answer + 3;
         total_questions = total_questions + 1;
            $("#q5c + label").addClass("selected_nope");
            $("#q5b + label").addClass("selected_ohyes");
            $("[name=wrong5_2]").show(400);
        }

        $("#q5a").prop("disabled", true);
        $("#q5b").prop("disabled", true);
        $("#q5c").prop("disabled", true);

    
    });

    $("#final_result").on("click", function(){

        if (total_questions === 5){
            if  (total_count === 5) {
                $("#final_5").show(400);
            } else if (total_count === 4) {
                $("#final_4").show(400);
            } else if (total_count === 3) {
                $("#final_3").show(400);
            } else if (total_count === 2) {
                $("#final_2").show(400);
            } else if (total_count === 1) {
                $("#final_1").show(400);
            } else if (total_count === 0) {
                $("#final_0").show(400);
            }
        } else {
            alert("Vastaa kaikkiin kysymyksiin!")
        }
        });
    });
   

  
