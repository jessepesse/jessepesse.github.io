/*Tekijä: Henrik Korpi / TIK21KM */

$(function() {
    //Laskuri kysymyksille ja oikeille vastauksille
    let pisteet = 0;
    let kysymykset = 0;
    //Ensimmäinen radiobutton
    $(".ava1").on("click", function(){
        $("#answer1").show();
        
        let valinta = $("[name=ava1]:checked").val();

        if (valinta === "1") {
            pisteet = pisteet + 1;
            kysymykset = kysymykset + 1;
            $("#kolmas + label").addClass("oikein");
            $("#oikein1").show(1500);
            $("#answer1").addClass("green");
        }else if (valinta === "2") {
            kysymykset = kysymykset + 1;
            $("#kolmas + label").addClass("oikein");
            $("#viides + label").addClass("väärin");
            $("#väärin1").show(1500);
            $("#answer1").addClass("red");
        }else if (valinta === "3") {
            kysymykset = kysymykset + 1;
            $("#kolmas + label").addClass("oikein");
            $("#ensimmäinen + label").addClass("väärin");
            $("#väärin1").show(1500);
            $("#answer1").addClass("red");
        }else {
            kysymykset = kysymykset + 1;
            $("#kolmas + label").addClass("oikein");
            $("#toinen + label").addClass("väärin");
            $("#väärin1").show(1500);
            $("#answer1").addClass("red");
        }
        $("#kolmas").prop("disabled", true);
        $("#viides").prop("disabled", true);
        $("#ensimmäinen").prop("disabled", true);
        $("#toinen").prop("disabled", true);
    });
    //Toinen radiobutton
    $(".ava2").on("click", function(){
        $("#answer2").show(0);
        
        let valinta = $("[name=ava2]:checked").val();

        if (valinta === "1") {
            kysymykset = kysymykset + 1;
            $("#five + label").addClass("väärin");
            $("#eight + label").addClass("oikein");
            $("#väärin2").show(1500);
            $("#answer2").addClass("red");
        }else if (valinta === "2") {
            kysymykset = kysymykset + 1;
            $("#eight + label").addClass("oikein");
            $("#ten + label").addClass("väärin");
            $("#väärin2").show(1500);
            $("#answer2").addClass("red");
        }else if (valinta === "3") {
            pisteet = pisteet + 1;
            kysymykset = kysymykset + 1;
            $("#eight + label").addClass("oikein");
            $("#oikein2").show(1500);
            $("#answer2").addClass("green");
        }else {
            kysymykset = kysymykset + 1;
            $("#eight + label").addClass("oikein");
            $("#nine + label").addClass("väärin");
            $("#väärin2").show(1500);
            $("#answer2").addClass("red");
        }

        $("#five").prop("disabled", true);
        $("#ten").prop("disabled", true);
        $("#eight").prop("disabled", true);
        $("#nine").prop("disabled", true);
    });
    //Kolmas radiobutton
    $(".ava3").on("click", function(){
        $("#answer3").show();
        
        let valinta = $("[name=ava3]:checked").val();

        if (valinta === "1") {
            pisteet = pisteet + 1;
            kysymykset = kysymykset + 1;
            $("#jupiter + label").addClass("oikein");
            $("#oikein3").show(1500);
            $("#answer3").addClass("green");
        }else if (valinta === "2") {
            kysymykset = kysymykset + 1;
            $("#jupiter + label").addClass("oikein");
            $("#saturnus + label").addClass("väärin");
            $("#väärin3").show(1500);
            $("#answer3").addClass("red");
        }else if (valinta === "3") {
            kysymykset = kysymykset + 1;
            $("#jupiter + label").addClass("oikein");
            $("#mars + label").addClass("väärin");
            $("#väärin3").show(1500);
            $("#answer3").addClass("red");
        }else {
            kysymykset = kysymykset + 1;
            $("#jupiter + label").addClass("oikein");
            $("#uranus + label").addClass("väärin");
            $("#väärin3").show(1500);
            $("#answer3").addClass("red");
        }
        
        $("#jupiter").prop("disabled", true);
        $("#saturnus").prop("disabled", true);
        $("#mars").prop("disabled", true);
        $("#uranus").prop("disabled", true);
    });
    //Neljäs radiobutton
    $(".ava4").on("click", function(){
        $("#answer4").show();
        
        let valinta = $("[name=ava4]:checked").val();

        if (valinta === "1") {
            kysymykset = kysymykset + 1;
            $("#merkurius + label").addClass("oikein");
            $("#venus + label").addClass("väärin");
            $("#väärin4").show(1500);
            $("#answer4").addClass("red");
        }else if (valinta === "2") {
            kysymykset = kysymykset + 1;
            $("#merkurius + label").addClass("oikein");
            $("#maa + label").addClass("väärin");
            $("#väärin4").show(1500);
            $("#answer4").addClass("red");
        }else if (valinta === "3") {
            kysymykset = kysymykset + 1;
            $("#merkurius + label").addClass("oikein");
            $("#pluto + label").addClass("väärin");
            $("#väärin4").show(1500);
            $("#answer4").addClass("red");
        }else {
            pisteet = pisteet + 1;
            kysymykset = kysymykset + 1;
            $("#merkurius + label").addClass("oikein");
            $("#oikein4").show(1500);
            $("#answer4").addClass("green");
        }
        
        $("#merkurius").prop("disabled", true);
        $("#venus").prop("disabled", true);
        $("#maa").prop("disabled", true);
        $("#pluto").prop("disabled", true);
    });
    //Viides radiobutton
    $(".ava5").on("click", function(){
        $("#answer5").show();
        
        let valinta = $("[name=ava5]:checked").val();

        if (valinta === "1") {
            kysymykset = kysymykset + 1;
            $("#luku4 + label").addClass("oikein");
            $("#luku1 + label").addClass("väärin");
            $("#väärin5").show(1500);
            $("#answer5").addClass("red");
        }else if (valinta === "2") {
            kysymykset = kysymykset + 1;
            $("#luku4 + label").addClass("oikein");
            $("#luku2 + label").addClass("väärin");
            $("#väärin5").show(1500);
            $("#answer5").addClass("red");
        }else if (valinta === "3") {
            kysymykset = kysymykset + 1;
            $("#luku4 + label").addClass("oikein");
            $("#luku3 + label").addClass("väärin");
            $("#väärin5").show(1500);
            $("#answer5").addClass("red");
        }else {
            pisteet = pisteet + 1;
            kysymykset = kysymykset + 1;
            $("#luku4 + label").addClass("oikein");
            $("#oikein5").show(1500);
            $("#answer5").addClass("green");
        }
        
        $("#luku1").prop("disabled", true);
        $("#luku2").prop("disabled", true);
        $("#luku3").prop("disabled", true);
        $("#luku4").prop("disabled", true);
    });
    //Tulosten näyttäminen, kysymysten piilottaminen ja varoitus clickistä jos et ole vastannut kaikkiin kysymyksiin
    $("#yhteenveto").on("click", function(){

        if (kysymykset === 5){
            $("#kysymykset").addClass("piilota");
            $("#lopullinen").html("Sinun pisteesi ovat: " + pisteet + "/" + kysymykset);
            $("#tulokset").show(500);
            if(pisteet === 5){
                $("#tulos1").show(1000);
            }else if (pisteet === 4){
                $("#tulos2").show(1000);
            }else if (pisteet === 3){
                $("#tulos3").show(1000);
            }else {
                $("#tulos4").show(1000);
            }

        }else {
            alert("Vastaa ensiksi kaikkiin kysymyksiin.")
          
        }
        
    });

});