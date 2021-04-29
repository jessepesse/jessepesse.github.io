/// <reference path="jquery-3.6.0.min.js" />

// Laura Vikström   TIK21KM

$(function() {

    let books = [
        '',
        '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>'
    ];

    let oikeavastaus = 0;
    let kirjailija1 = "";
    let kirjailija2 = "";
    let kirjailija3 = "";
    let kirjailija4 = "";
    let kirjailija5 = "";
    
    $("#vastaus1_painike").on("click", function(){
        kirjailija1 = $("#vastaus1").val();

        $("#vastaus1").prop("disabled", true);
        $("#ok1_painike").show(0);
        
        if (kirjailija1 == "J. R. R. Tolkien" || kirjailija1 == "J.R.R. Tolkien") {
            oikeavastaus = 1;
            $("#tolkien_answer2").html("oikein! Olet vastannut " + oikeavastaus + " kysymykseen oikein. Sinulla on neljä kysymystä jäljellä.");
            $("#tolkien1").show(0);
            $("#tolkien2").show(0);
        } else {
            $("#tolkien_answer2").html("väärin. Sinulla on neljä kysymystä jäljellä.");
        }
    });

    $("#ok1_painike").on("click", function(){
        $("#doyleid").show(0);
        $("#tolkienid").hide(0);
        $("#general").hide(0);
        $("#vastaus2").trigger("focus");
    });

    $("#vastaus2_painike").on("click", function(){
        kirjailija2 = $("#vastaus2").val();

        $("#vastaus2").prop("disabled", true);
        $("#ok2_painike").show(0);

        if (kirjailija2 == "Arthur Conan Doyle" || kirjailija2 == "arthur conan doyle") {
            oikeavastaus = oikeavastaus + 1;
            $("#doyle_answer2").html("oikein! Olet vastannut " + oikeavastaus + " kysymykseen oikein. Sinulla on kolme kysymystä jäljellä.");
            $("#doyle1").show(0);
            $("#doyle2").show(0);
        } else {
            $("#doyle_answer2").html("väärin. Sinulla on kolme kysymystä jäljellä.");
        }
    });

    $("#ok2_painike").on("click", function(){
        $("#rowlingid").show(0);
        $("#doyleid").hide(0);
        $("#vastaus3").trigger("focus");
    });

    $("#vastaus3_painike").on("click", function(){
        kirjailija3 = $("#vastaus3").val();

        $("#vastaus3").prop("disabled", true);
        $("#ok3_painike").show(0);

        if (kirjailija3 == "J. K. Rowling" || kirjailija3 == "J.K. Rowling") {
            oikeavastaus = oikeavastaus + 1;
            $("#rowling_answer2").html("oikein! Olet vastannut " + oikeavastaus + " kysymykseen oikein. Sinulla on kaksi kysymystä jäljellä.");
            $("#rowling1").show(0);
            $("#rowling2").show(0);
        } else {
            $("#rowling_answer2").html("väärin. Sinulla on kaksi kysymystä jäljellä.");
        }
    });

    $("#ok3_painike").on("click", function(){
        $("#martinid").show(0);
        $("#rowlingid").hide(0);
        $("#vastaus4").trigger("focus");
    });


    $("#vastaus4_painike").on("click", function(){
        kirjailija4 = $("#vastaus4").val();

        $("#vastaus4").prop("disabled", true);
        $("#ok4_painike").show(0);

        if (kirjailija4 == "George R. R. Martin" || kirjailija4 == "George R.R. Martin") {
            oikeavastaus = oikeavastaus + 1;
            $("#martin_answer2").html("oikein! Olet vastannut " + oikeavastaus + " kysymykseen oikein. Sinulla on yksi kysymys jäljellä.");
            $("#martin1").show(0);
            $("#martin2").show(0);
        } else {
            $("#martin_answer2").html("väärin. Sinulla on yksi kysymys jäljellä.");
        }
    });

    $("#ok4_painike").on("click", function(){
        $("#lewisid").show(0);
        $("#martinid").hide(0);
        $("#vastaus5").trigger("focus");
    });

    $("#vastaus5_painike").on("click", function(){
        kirjailija5 = $("#vastaus5").val();

        $("#vastaus5").prop("disabled", true);
        $("#ok5_painike").show(0);

        if (kirjailija5 == "C. S. Lewis" || kirjailija5 == "C.S. Lewis") {
            oikeavastaus = oikeavastaus + 1;
            $("#lewis_answer2").html("oikein! Olet vastannut " + oikeavastaus + " kysymykseen oikein. Tämä oli viimeinen kysymys.");
            $("#lewis1").show(0);
            $("#lewis2").show(0);
        } else {
            $("#lewis_answer2").html("väärin. Tämä oli viimeinen kysymys.");
        }
    });

    $("#ok5_painike").on("click", function(){
        $("#lopputulos").show(0);
        $("#lewisid").hide(0);
        
        $("#oikeatvaarat").show(0);
        $("#vastauksienmaara").show(0);

        /*for (let i = 0; i < 100; i++) {
            let noppa1 = getRndInteger(1, 6);
            let noppa2 = getRndInteger(1, 6);

            if (noppa1 === 6 && noppa2 === 6) {
                pairs[0]++;
                pairs[6]++;
                $("#dices").append("<li>" + dice[noppa1] + dice[noppa2] + pair[1] + "</li>");
            }
            else if (noppa1 === noppa2) {
                pairs[0]++;
                pairs[noppa1]++;
                $("#dices").append("<li>" + dice[noppa1] + dice[noppa2] + pair[0] + "</li>");
            } else {
                $("#dices").append("<li>" + dice[noppa1] + dice[noppa2] + "</li>");
            }

            let parit1 = "<span class=palikka>1:" + pairs[1] + "</span>" + " "
                + "<span class=palikka>2:" + pairs[2] + "</span>" + " "
                + "<span class=palikka>3:" + pairs[3] + "</span>" + " "
                + "<span class=palikka>4:" + pairs[4] + "</span>" + " "
                + "<span class=palikka>5:" + pairs[5] + "</span>" + " "
                + "<span class=palikka>6:" + pairs[6] + "</span>" + " "
                + "<span class=kalikka>All:" + pairs[0] + "</span>";

            $("#pairs").html(parit1);
            $(".palikka").addClass("badge bg-primary");
            $(".kalikka").addClass("badge bg-secondary");
        }
    });
        */

    for (let kierros = 1; kierros <= oikeavastaus; kierros++) {
        $("#vastauksienmaara").append("<li>" + books[kierros] + "</li>");
    }
    
        if (kirjailija1 != "J. R. R. Tolkien" && kirjailija1 != "J.R.R. Tolkien") {
            $("#vaarat").append("1. Kuka on kirjoittanut kirjan Taru Sormusten Herrasta? ")
            $("#vaarat").append("Vastasit: " + kirjailija1 + ". Oikea vastaus on J. R. R. Tolkien.")
            $("#tolkientulos").show(0);
        }
        if (kirjailija2 != "Arthur Conan Doyle" && kirjailija2 != "arthur conan doyle") {
            $("#vaarat").append("<br>" + "2. Kuka on kirjoittanut Sherlock Holmes -kirjat? ")
            $("#vaarat").append("Vastasit: " + kirjailija2 + ". Oikea vastaus on Arthur Conan Doyle.")
            $("#doyletulos").show(0);
        }
        if (kirjailija3 != "J. K. Rowling" && kirjailija3 != "J.K. Rowling") {
            $("#vaarat").append("<br>" + "3. Kuka on kirjoittanut Harry Potter -kirjasarjan? ")
            $("#vaarat").append("Vastasit: " + kirjailija3 + ". Oikea vastaus on J. K. Rowling.")
            $("#rowlingtulos").show(0);
        }
        if (kirjailija4 != "George R. R. Martin" && kirjailija4 != "George R.R. Martin") {
            $("#vaarat").append("<br>" + "4. Kuka on kirjoittanut Tulen ja jään laulu -kirjasarjan? ")
            $("#vaarat").append("Vastasit: " + kirjailija4 + ". Oikea vastaus on George R. R. Martin.")
            $("#martintulos").show(0);
        }
        if (kirjailija5 != "C. S. Lewis" && kirjailija5 != "C.S. Lewis") {
            $("#vaarat").append("<br>" + "5. Kuka on kirjoittanut Narnian Tarinat -kirjasarjan? ")
            $("#vaarat").append("Vastasit: " + kirjailija5 + ". Oikea vastaus on J. R. R. Tolkien.")
            $("#lewistulos").show(0);
        }
    });
});