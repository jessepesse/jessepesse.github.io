/// <reference path="jquery-3.6.0.min.js" />

// Laura Vikström   TIK21KM

$(function () {
  // Globaalit muuttujat
  let oikeavastaus = 0
  let kirjailija1 = ''
  let kirjailija2 = ''
  let kirjailija3 = ''
  let kirjailija4 = ''
  let kirjailija5 = ''

  // Ensimmäisen kysymyksen Vastaa-painikkeen toiminnallisuus
  $('#vastaus1_painike').on('click', function () {
    kirjailija1 = $('#vastaus1').val()

    if (kirjailija1 === '') {
      alert('Vastauksesi ei voi olla tyhjä.')
    } else {
      $('#vastaus1').prop('disabled', true)
      $('#vastaus1_painike').prop('disabled', true)
      $('#ok1_painike').show(0)

      if (
        kirjailija1 == 'J. R. R. Tolkien' || kirjailija1 == 'J.R.R. Tolkien') {
        oikeavastaus = 1
        $('#tolkien_answer2').html('oikein! Olet vastannut ' + oikeavastaus +' kysymykseen oikein. Sinulla on neljä kysymystä jäljellä.')
        $('#tolkien1').show(0)
        $('#tolkien2').show(0)
      } else {
        $('#tolkien_answer2').html('väärin. Sinulla on neljä kysymystä jäljellä.')
      }
    }
  })

  // Ensimmmäisen vastauksen "Näytä seuraava kysymys"-napin toiminnallisuus
  $('#ok1_painike').on('click', function () {
    $('#doyleid').show(0)
    $('#tolkienid').hide(0)
    $('#general').hide(0)
    $('#vastaus2').trigger('focus')
  })

  // Toisen kysymyksen Vastaa-painikkeen toiminnallisuus
  $('#vastaus2_painike').on('click', function () {
    kirjailija2 = $('#vastaus2').val()

    if (kirjailija2 === '') {
      alert('Vastauksesi ei voi olla tyhjä.')
    } else {
      $('#vastaus2').prop('disabled', true)
      $('#vastaus2_painike').prop('disabled', true)
      $('#ok2_painike').show(0)

      if (kirjailija2 == 'Arthur Conan Doyle' ||  kirjailija2 == 'arthur conan doyle') {
        oikeavastaus = oikeavastaus + 1
        $('#doyle_answer2').html('oikein! Olet vastannut ' + oikeavastaus + ' kysymykseen oikein. Sinulla on kolme kysymystä jäljellä.')
        $('#doyle1').show(0)
        $('#doyle2').show(0)
      } else {
        $('#doyle_answer2').html('väärin. Sinulla on kolme kysymystä jäljellä.')
      }
    }
  })

  // Toisen vastauksen "Näytä seuraava kysymys"-napin toiminnallisuus
  $('#ok2_painike').on('click', function () {
    $('#rowlingid').show(0)
    $('#doyleid').hide(0)
    $('#vastaus3').trigger('focus')
  })

  // Kolmannen kysymyksen Vastaa-painikkeen toiminnallisuus
  $('#vastaus3_painike').on('click', function () {
    kirjailija3 = $('#vastaus3').val()

    if (kirjailija3 === '') {
      alert('Vastauksesi ei voi olla tyhjä.')
    } else {
      $('#vastaus3').prop('disabled', true)
      $('#vastaus3_painike').prop('disabled', true)
      $('#ok3_painike').show(0)

      if (kirjailija3 == 'J. K. Rowling' || kirjailija3 == 'J.K. Rowling') {
        oikeavastaus = oikeavastaus + 1
        $('#rowling_answer2').html('oikein! Olet vastannut ' + oikeavastaus + ' kysymykseen oikein. Sinulla on kaksi kysymystä jäljellä.')
        $('#rowling1').show(0)
        $('#rowling2').show(0)
      } else {
        $('#rowling_answer2').html('väärin. Sinulla on kaksi kysymystä jäljellä.')
      }
    }
  })

  // Kolmannen vastauksen "Näytä seuraava kysymys"-napin toiminnallisuus
  $('#ok3_painike').on('click', function () {
    $('#martinid').show(0)
    $('#rowlingid').hide(0)
    $('#vastaus4').trigger('focus')
  })

  // Neljännen kysymyksen Vastaa-painikkeen toiminnallisuus
  $('#vastaus4_painike').on('click', function () {
    kirjailija4 = $('#vastaus4').val()

    if (kirjailija4 === '') {
      alert('Vastauksesi ei voi olla tyhjä.')
    } else {
      $('#vastaus4').prop('disabled', true)
      $('#vastaus4_painike').prop('disabled', true)
      $('#ok4_painike').show(0)

      if (kirjailija4 == 'George R. R. Martin' || kirjailija4 == 'George R.R. Martin') {
        oikeavastaus = oikeavastaus + 1
        $('#martin_answer2').html('oikein! Olet vastannut ' + oikeavastaus + ' kysymykseen oikein. Sinulla on yksi kysymys jäljellä.')
        $('#martin1').show(0)
        $('#martin2').show(0)
      } else {
        $('#martin_answer2').html('väärin. Sinulla on yksi kysymys jäljellä.')
      }
    }
  })

  // Neljännen vastauksen "Näytä seuraava kysymys"-napin toiminnallisuus
  $('#ok4_painike').on('click', function () {
    $('#lewisid').show(0)
    $('#martinid').hide(0)
    $('#vastaus5').trigger('focus')
  })

  // Viidennen kysymyksen Vastaa-painikkeen toiminnallisuus
  $('#vastaus5_painike').on('click', function () {
    kirjailija5 = $('#vastaus5').val()

    if (kirjailija5 === '') {
      alert('Vastauksesi ei voi olla tyhjä.')
    } else {
      $('#vastaus5').prop('disabled', true)
      $('#vastaus5_painike').prop('disabled', true)
      $('#ok5_painike').show(0)

      if (kirjailija5 == 'C. S. Lewis' || kirjailija5 == 'C.S. Lewis') {
        oikeavastaus = oikeavastaus + 1
        $('#lewis_answer2').html('oikein! Olet vastannut ' + oikeavastaus + ' kysymykseen oikein. Tämä oli viimeinen kysymys.')
        $('#lewis1').show(0)
        $('#lewis2').show(0)
      } else {
        $('#lewis_answer2').html('väärin. Tämä oli viimeinen kysymys.')
      }
    }
  })

  /* Viidennen vastauksen "Näytä tulokset"-napin toiminnallisuus ja
     tuloksien tulostaminen */
  $('#ok5_painike').on('click', function () {
    $('#vastaukset').show(0)
    $('#lewisid').hide(0)

    $('#vastauksienmaara').show(0)

    if (oikeavastaus < 5) {
      $('#oikeatvaarat').show(0)
    }
    let books = [
      '',
      '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>',
      '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>',
      '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>',
      '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>',
      '<span><img src="img/lv_book.png" class="img-fluid" alt=""/></span>'
    ]

    for (let kierros = 1; kierros <= oikeavastaus; kierros++) {
      $('#vastauksienmaara').append(books[1])
    }

    if (oikeavastaus === 5) {
      $('.pixabay').show(0)
      $('#vastaukset').html('Mahtavaa! Keräsit kaikki viisi kirjaa! Onneksi olkoon!'
      )
    } else if (oikeavastaus === 4) {
      $('.pixabay').show(0)
      $('#vastaukset').html('Hienoa! Sait 4/5 kirjaa oikein!')
    } else if (oikeavastaus === 3) {
      $('.pixabay').show(0)
      $('#vastaukset').html('Sait kolme oikein. Se on yli puolet vastauksista! Hyvin tehty!'
      )
    } else if (oikeavastaus === 2 || oikeavastaus === 1) {
      $('.pixabay').show(0)
      $('#vastaukset').html('Sait ' + oikeavastaus + '/5. Sekin on nollaa enemmän! Kannattaa kuitenkin hieman petrata kirjallisuustietämystäsi.')
    } else {
      $('#vastaukset').html('Ohhoh. Et saanut yhtään oikein. Alla olevista linkeistä kannattaa mennä tutustumaan kyseisiin kirjailijoihin.'
      )
    }

    if (kirjailija1 != 'J. R. R. Tolkien' && kirjailija1 != 'J.R.R. Tolkien') {
      $('#vaarat').append('1. Kuka on kirjoittanut kirjan Taru Sormusten Herrasta? ')
      $('#vaarat').append('Vastasit: ' + kirjailija1 + '. Oikea vastaus on J. R. R. Tolkien.')
      $('#tolkientulos').show(0)
    }
    if ( kirjailija2 != 'Arthur Conan Doyle' && kirjailija2 != 'arthur conan doyle') {
      $('#vaarat').append('<br>' + '2. Kuka on kirjoittanut Sherlock Holmes -kirjat? ')
      $('#vaarat').append('Vastasit: ' + kirjailija2 + '. Oikea vastaus on Arthur Conan Doyle.')
      $('#doyletulos').show(0)
    }
    if (kirjailija3 != 'J. K. Rowling' && kirjailija3 != 'J.K. Rowling') {
      $('#vaarat').append('<br>' + '3. Kuka on kirjoittanut Harry Potter -kirjasarjan? ')
      $('#vaarat').append('Vastasit: ' + kirjailija3 + '. Oikea vastaus on J. K. Rowling.')
      $('#rowlingtulos').show(0)
    }
    if (kirjailija4 != 'George R. R. Martin' && kirjailija4 != 'George R.R. Martin') {
      $('#vaarat').append('<br>' + '4. Kuka on kirjoittanut Tulen ja jään laulu -kirjasarjan? ')
      $('#vaarat').append('Vastasit: ' + kirjailija4 + '. Oikea vastaus on George R. R. Martin.')
      $('#martintulos').show(0)
    }
    if (kirjailija5 != 'C. S. Lewis' && kirjailija5 != 'C.S. Lewis') {
      $('#vaarat').append('<br>' + '5. Kuka on kirjoittanut Narnian Tarinat -kirjasarjan? ')
      $('#vaarat').append('Vastasit: ' + kirjailija5 + '. Oikea vastaus on C. S. Lewis.')
      $('#lewistulos').show(0)
    }
  })
})
