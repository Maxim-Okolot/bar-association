(function () {

  // slider team
  new Swiper(".team-slider", {
    slidesPerView: 4,
    allowTouchMove: true, // on swipe
    loop: true,
    spaceBetween: 40,
    navigation: {
      nextEl: ".slider-arrow__next",
      prevEl: ".slider-arrow__prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      400: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      860: {
        slidesPerView: 3,
        spaceBetween: 15
      }
    },
  });

  // fix header
  (function fixHeader() {
    let header = document.querySelector('.header');

    function fixed() {
      if (window.scrollY > 200 && !header.classList.contains('fixed')) {
        header.classList.add('fixed');
      } else if (window.scrollY < 200 && header.classList.contains('fixed')) {
        header.classList.remove('fixed');
      }
    }

    window.addEventListener('scroll', fixed);
    document.addEventListener('DOMContentLoaded', fixed);
  })();


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
      })
    }
  })();

  (function popup () {
    let popup = document.querySelector('#popup');
    let body = document.querySelector('body');
    let buttonsOpenPopup = document.querySelectorAll('.open-popup');
    let openQuiz = document.querySelector('#open-quiz');
    let buttonsOpenForm = document.querySelectorAll('.open-form');
    let openSelectSpecialist = document.querySelector('#select-specialist');



    function changeVisiblePopup() {
      popup.classList.toggle('hide');
      body.classList.toggle('fix');
    }


    for (let i = 0; i < buttonsOpenPopup.length; i++) {
      buttonsOpenPopup[i].addEventListener('click', changeVisiblePopup);
    }

    window.addEventListener('click', function (event) {
      if (event.target.classList.contains('popup') || event.target.closest('.close')) {
        changeVisiblePopup();
        popup.classList.remove('quiz', 'selection', 'feedback');
      }
    })

    openQuiz.addEventListener('click', function () {
      popup.classList.add('quiz');

      let items = document.querySelectorAll('.quiz-slide');
      let prev = document.querySelector('#quiz-prev');
      let next = document.querySelector('#quiz-next');

      let currentSlide = 1;

      function validation() {
        let inputs = document.getElementsByName(`steep-${currentSlide}`);

         for (let i = 0; i < inputs.length; i++) {
           inputs[i].addEventListener('change', function () {
             next.removeAttribute('disabled');
           })
         }
      }

      validation();

     next.addEventListener('click', function () {
       if (currentSlide < items.length) {
         for (let i = 0; i < items.length; i++) {
           items[i].classList.add('hide');
         }

         items[currentSlide].classList.remove('hide');
         next.setAttribute('disabled', true);
         currentSlide++;

         if (currentSlide > 1) {
           prev.removeAttribute('disabled');
         }
         validation()
       }
     })

      prev.addEventListener('click', function () {

        if (currentSlide > 1) {
          for (let i = 0; i < items.length; i++) {
            items[i].classList.add('hide');
          }

          currentSlide--;
          items[currentSlide].classList.remove('hide');
          validation();

          if (currentSlide === 1) {
            prev.setAttribute('disabled', true);
          }
        }
      })
    })

    for (let i = 0; i < buttonsOpenForm.length; i++) {
      buttonsOpenForm[i].addEventListener('click', function () {
        popup.classList.add('feedback');
      })
    }

    openSelectSpecialist.addEventListener('click', function () {
      popup.classList.add('selection');
    })


  })();


  ymaps.ready(init);

  function init() {

    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
        center: [50.443705, 30.530946],
        zoom: 14
      }, {
        searchControlProvider: 'yandex#search'
      })
  }
})();




jQuery(function ($) {

  // masked inputs phone
  $('.masked').mask('+7 (999) 999 99 99');

});