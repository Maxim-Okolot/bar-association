(function () {

  // slider team
  let slider = new Swiper(".team-slider", {
    slidesPerView: 4,
    allowTouchMove: true, // on swipe
    loop: true,
    spaceBetween: 40,
    navigation: {
      nextEl: ".slider-arrow__next",
      prevEl: ".slider-arrow__prev",
    },
    // breakpoints: {
    //   320: {
    //     slidesPerView: 1,
    //     spaceBetween: 10,
    //     grid: {
    //       rows: 3,
    //     },
    //   },
    //   640: {
    //     slidesPerView: 1,
    //     spaceBetween: 20,
    //     grid: {
    //       rows: 3,
    //     },
    //   },
    //   980: {
    //     slidesPerView: 2,
    //     spaceBetween: 15,
    //     grid: {
    //       rows: 2,
    //     },
    //   }
    // },
  });



  // lazy scroll
  (function lazyScroll() {
    let links = document.querySelectorAll('.link-anchor');

    for (let link of links) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const blockID = link.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        if (window.innerWidth <= 750) {
         setTimeout(function () {
           document.querySelector('#hamburger').classList.remove('open');
           document.querySelector('body').classList.toggle('fix');
         }, 500);
        }
      })
    }
  })();

})();




jQuery(function ($) {
  function validation(items) {
    inputs = items;

    let inputStatusValidate = [];

    // first validation form
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value == '') {
        inputs[i].classList.add('no-valid');

        if (!inputs[i].nextElementSibling.classList.contains('valid')) {
          inputs[i].insertAdjacentHTML('afterend', '<span class="valid">Поле должность быть заполнено</span>');
        }

        inputStatusValidate.push(false);

      } else {
        inputs[i].classList.remove('no-valid');
        inputStatusValidate.push(true);
        if (inputs[i].nextElementSibling.classList.contains('valid')) {
          inputs[i].nextElementSibling.remove();
        }
      }
    }

    // second validation form
    // true = canceled sending
    if (inputStatusValidate.includes(false)) {
      return false;
    }
  }

  // masked inputs phone
  $('.masked').mask('+7 (999) 999 99 99');

  // form of section feedback
  $('#popup-from').submit(function (event) {
      event.preventDefault();

      let inputs = this.querySelectorAll('.popup-from__input');

      // validation form
      validation(inputs);

      if (validation(inputs) === false) {
        return false;
      }

      // sending form
      $.ajax({
        type: "POST",
        url: "php/popup-form.php",
        data: $(this).serialize()
      }).done(function () {
        $(this).find('input').val('');
        $('#popup-from').trigger('reset');
        $("#popup").addClass("visible");
        $("body").addClass("fix");
        $("#popup-thanks").removeClass("hide")
        $("#popup-from").addClass("hide");
      });
    }
  );
});