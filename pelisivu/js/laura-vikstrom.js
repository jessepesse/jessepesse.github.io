/// <reference path="jquery-3.6.0.min.js" />

// Laura Vikström   TIK21KM

$(function () {
  // Globaalit muuttujat
  let maara1 = 0
  let vastaukset1 = 0

  // Ensimmäisen kysymyksen js-koodi
  $('.luonto1').on('click', function () {
    $('#brownbear1').show(4000)
    $('#brownbear2').show(1200)
    $('#brownbear3').show(1200)

    let selection = $('[name=luonto1]:checked').val()

    if (selection === '1') {
      maara1 = maara1 + 1
      vastaukset1 = vastaukset1 + 1
      $('.lopputulos').html(maara1)
      $('#ruskeakarhu1 + label').addClass('selected_c')
      $('#right1').show(1200)
    } else if (selection === '2') {
      vastaukset1 = vastaukset1 + 1
      $('#kettu1 + label').addClass('selected')
      $('#ruskeakarhu1 + label').addClass('selected_c')
      $('#wrong1').show(1200)
    } else if (selection === '3') {
      vastaukset1 = vastaukset1 + 1
      $('#kilpikonna1 + label').addClass('selected')
      $('#ruskeakarhu1 + label').addClass('selected_c')
      $('#wrong1').show(1200)
    } else {
      vastaukset1 = vastaukset1 + 1
      $('#orava1 + label').addClass('selected')
      $('#ruskeakarhu1 + label').addClass('selected_c')
      $('#wrong1').show(1200)
    }

    $('#kettu1').prop('disabled', true)
    $('#ruskeakarhu1').prop('disabled', true)
    $('#kilpikonna1').prop('disabled', true)
    $('#orava1').prop('disabled', true)

    if (vastaukset1 === 5) {
      $('.pixabay').show(0)
      if (maara1 === 5) {
        $('#tulos5').show(500)
        $('#tulos5_1').show(500)
        $('#tulos5_2').show(500)
      } else if (maara1 === 4) {
        $('#tulos4').show(500)
        $('#tulos4_1').show(500)
        $('#tulos4_2').show(500)
      } else if (maara1 === 3) {
        $('#tulos3').show(500)
        $('#tulos3_1').show(500)
        $('#tulos3_2').show(500)
      } else if (maara1 === 2) {
        $('#tulos2').show(500)
        $('#tulos2_1').show(500)
      } else if (maara1 === 1) {
        $('#tulos1').show(500)
        $('#tulos1_1').show(500)
      } else if (maara1 === 0) {
        $('#tulos0').show(500)
        $('#tulos0_1').show(500)
      }
    }
  })

  // Toisen kysymyksen js-koodi
  $('.puu1').on('click', function () {
    $('#redwood1').show(3500)
    $('#redwood2').show(1200)
    $('#redwood3').show(1300)

    let selection = $('[name=puu1]:checked').val()

    if (selection === '1') {
      maara1 = maara1 + 1
      vastaukset1 = vastaukset1 + 1
      $('.lopputulos').html(maara1)
      $('#punapuu1 + label').addClass('selected_c')
      $('#right2').show(1200)
    } else if (selection === '2') {
      vastaukset1 = vastaukset1 + 1
      $('#koivu1 + label').addClass('selected')
      $('#punapuu1 + label').addClass('selected_c')
      $('#wrong2').show(1200)
    } else if (selection === '3') {
      vastaukset1 = vastaukset1 + 1
      $('#vuorijalava1 + label').addClass('selected')
      $('#punapuu1 + label').addClass('selected_c')
      $('#wrong2').show(1200)
    } else if (selection === '4') {
      vastaukset1 = vastaukset1 + 1
      $('#vaahtera1 + label').addClass('selected')
      $('#punapuu1 + label').addClass('selected_c')
      $('#wrong2').show(1200)
    } else {
      vastaukset1 = vastaukset1 + 1
      $('#kuusi1 + label').addClass('selected')
      $('#punapuu1 + label').addClass('selected_c')
      $('#wrong2').show(1200)
    }

    $('#koivu1').prop('disabled', true)
    $('#vuorijalava1').prop('disabled', true)
    $('#vaahtera1').prop('disabled', true)
    $('#punapuu1').prop('disabled', true)
    $('#kuusi1').prop('disabled', true)

    if (vastaukset1 === 5) {
      $('.pixabay').show(0)
      if (maara1 === 5) {
        $('#tulos5').show(500)
        $('#tulos5_1').show(500)
        $('#tulos5_2').show(500)
      } else if (maara1 === 4) {
        $('#tulos4').show(500)
        $('#tulos4_1').show(500)
        $('#tulos4_2').show(500)
      } else if (maara1 === 3) {
        $('#tulos3').show(500)
        $('#tulos3_1').show(500)
        $('#tulos3_2').show(500)
      } else if (maara1 === 2) {
        $('#tulos2').show(500)
        $('#tulos2_1').show(500)
      } else if (maara1 === 1) {
        $('#tulos1').show(500)
        $('#tulos1_1').show(500)
      } else if (maara1 === 0) {
        $('#tulos0').show(500)
        $('#tulos0_1').show(500)
      }
    }
  })

  // Kolmannen kysymyksen js-koodi
  $('.marja1').on('click', function () {
    $('#solanum_n1').show(4000)
    $('#solanum_n2').show(1200)
    $('#solanum_n3').show(1300)

    let selection = $('[name=marja1]:checked').val()

    if (selection === '1') {
      maara1 = maara1 + 1
      vastaukset1 = vastaukset1 + 1
      $('.lopputulos').html(maara1)
      $('#punakoiso1 + label').addClass('selected_c')
      $('#right3').show(1200)
    } else if (selection === '2') {
      vastaukset1 = vastaukset1 + 1
      $('#pikkukarpalo1 + label').addClass('selected')
      $('#punakoiso1 + label').addClass('selected_c')
      $('#wrong3').show(1200)
    } else if (selection === '3') {
      vastaukset1 = vastaukset1 + 1
      $('#tyrni1 + label').addClass('selected')
      $('#punakoiso1 + label').addClass('selected_c')
      $('#wrong3').show(1200)
    } else if (selection === '4') {
      vastaukset1 = vastaukset1 + 1
      $('#mustikka1 + label').addClass('selected')
      $('#punakoiso1 + label').addClass('selected_c')
      $('#wrong3').show(1200)
    } else {
      vastaukset1 = vastaukset1 + 1
      $('#juolukka1 + label').addClass('selected')
      $('#punakoiso1 + label').addClass('selected_c')
      $('#wrong3').show(1200)
    }

    $('#pikkukarpalo1').prop('disabled', true)
    $('#tyrni1').prop('disabled', true)
    $('#mustikka1').prop('disabled', true)
    $('#juolukka1').prop('disabled', true)
    $('#punakoiso1').prop('disabled', true)

    if (vastaukset1 === 5) {
      $('.pixabay').show(0)
      if (maara1 === 5) {
        $('#tulos5').show(500)
        $('#tulos5_1').show(500)
        $('#tulos5_2').show(500)
      } else if (maara1 === 4) {
        $('#tulos4').show(500)
        $('#tulos4_1').show(500)
        $('#tulos4_2').show(500)
      } else if (maara1 === 3) {
        $('#tulos3').show(500)
        $('#tulos3_1').show(500)
        $('#tulos3_2').show(500)
      } else if (maara1 === 2) {
        $('#tulos2').show(500)
        $('#tulos2_1').show(500)
      } else if (maara1 === 1) {
        $('#tulos1').show(500)
        $('#tulos1_1').show(500)
      } else if (maara1 === 0) {
        $('#tulos0').show(500)
        $('#tulos0_1').show(500)
      }
    }
  })

  // Neljännen kysymyksen js-koodi
  $('.jarvi1').on('click', function () {
    $('#lakesin1').show(4000)
    $('#lakesin2').show(1200)
    $('#lakesin3').show(1300)

    let selection = $('[name=jarvi1]:checked').val()

    if (selection === '1') {
      $('.pixabay').show(0)
      maara1 = maara1 + 1
      vastaukset1 = vastaukset1 + 1
      $('.lopputulos').html(maara1)
      $('#satakuusikasi1 + label').addClass('selected_c')
      $('#right4').show(1200)
    } else if (selection === '2') {
      vastaukset1 = vastaukset1 + 1
      $('#tuhat1 + label').addClass('selected')
      $('#satakuusikasi1 + label').addClass('selected_c')
      $('#wrong4').show(1200)
    } else if (selection === '3') {
      vastaukset1 = vastaukset1 + 1
      $('#viisi1 + label').addClass('selected')
      $('#satakuusikasi1 + label').addClass('selected_c')
      $('#wrong4').show(1200)
    } else {
      vastaukset1 = vastaukset1 + 1
      $('#viisi_k1 + label').addClass('selected')
      $('#satakuusikasi1 + label').addClass('selected_c')
      $('#wrong4').show(1200)
    }

    $('#tuhat1').prop('disabled', true)
    $('#viisi1').prop('disabled', true)
    $('#viisi_k1').prop('disabled', true)
    $('#satakuusikasi1').prop('disabled', true)

    if (vastaukset1 === 5) {
      $('.pixabay').show(0)
      if (maara1 === 5) {
        $('#tulos5').show(500)
        $('#tulos5_1').show(500)
        $('#tulos5_2').show(500)
      } else if (maara1 === 4) {
        $('#tulos4').show(500)
        $('#tulos4_1').show(500)
        $('#tulos4_2').show(500)
      } else if (maara1 === 3) {
        $('#tulos3').show(500)
        $('#tulos3_1').show(500)
        $('#tulos3_2').show(500)
      } else if (maara1 === 2) {
        $('#tulos2').show(500)
        $('#tulos2_1').show(500)
      } else if (maara1 === 1) {
        $('#tulos1').show(500)
        $('#tulos1_1').show(500)
      } else if (maara1 === 0) {
        $('#tulos0').show(500)
        $('#tulos0_1').show(500)
      }
    }
  })

  // Viidennen kysymyksen js-koodi
  $('.elain1').on('click', function () {
    $('#mink1').show(4000)
    $('#mink2').show(1200)
    $('#mink3').show(1300)

    let selection = $('[name=elain1]:checked').val()

    if (selection === '1') {
      maara1 = maara1 + 1
      vastaukset1 = vastaukset1 + 1
      $('.lopputulos').html(maara1)
      $('#minkki2 + label').addClass('selected_c')
      $('#right5').show(1200)
    } else if (selection === '2') {
      vastaukset1 = vastaukset1 + 1
      $('#supikoira2 + label').addClass('selected')
      $('#minkki2 + label').addClass('selected_c')
      $('#wrong5').show(1200)
    } else if (selection === '3') {
      vastaukset1 = vastaukset1 + 1
      $('#mayra2 + label').addClass('selected')
      $('#minkki2 + label').addClass('selected_c')
      $('#wrong5').show(1200)
    } else {
      vastaukset1 = vastaukset1 + 1
      $('#ruskeakarhu2 + label').addClass('selected')
      $('#minkki2 + label').addClass('selected_c')
      $('#wrong5').show(1200)
    }

    $('#minkki2').prop('disabled', true)
    $('#supikoira2').prop('disabled', true)
    $('#mayra2').prop('disabled', true)
    $('#ruskeakarhu2').prop('disabled', true)

    if (vastaukset1 === 5) {
      $('.pixabay').show(0)
      if (maara1 === 5) {
        $('#tulos5').show(500)
        $('#tulos5_1').show(500)
        $('#tulos5_2').show(500)
      } else if (maara1 === 4) {
        $('#tulos4').show(500)
        $('#tulos4_1').show(500)
        $('#tulos4_2').show(500)
      } else if (maara1 === 3) {
        $('#tulos3').show(500)
        $('#tulos3_1').show(500)
        $('#tulos3_2').show(500)
      } else if (maara1 === 2) {
        $('#tulos2').show(500)
        $('#tulos2_1').show(500)
      } else if (maara1 === 1) {
        $('#tulos1').show(500)
        $('#tulos1_1').show(500)
      } else if (maara1 === 0) {
        $('#tulos0').show(500)
        $('#tulos0_1').show(500)
      }
    }
  })

  // Vastausten määrä 0, jos oikeat vastaukset 0.
  $('.lopputulos').html(0)
})
