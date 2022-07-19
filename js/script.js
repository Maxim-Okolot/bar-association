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
    let menuLink = document.querySelectorAll('.menu__link');

    for (let i = 0; i < menuLink.length; i++) {
      menuLink[i].addEventListener('click', function (e) {
        for (let x = 0; x < menuLink.length; x++) {
          menuLink[x].classList.remove('active');
        }

        e.target.classList.add('active');
      })
    }

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
      let progress = document.querySelector('.progress-color');
      let value = document.querySelector("#progress-value");

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
         value.innerHTML = currentSlide;

         progress.style.width = 100 / items.length * currentSlide + "%";

         if (currentSlide > 1) {
           prev.removeAttribute('disabled');
         }
         validation();
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
    var myMap = new ymaps.Map('map', {
        center: [55.765631380625905,37.659868629147084],
        zoom: 18
      }, {
        searchControlProvider: 'yandex#search'
      }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: '',
      balloonContent: ''
    }, {
      iconLayout: 'default#image',
      iconImageHref: './img/location.svg',
      iconImageSize: [68, 68],
      iconImageOffset: [-5, -38]
    })

    myMap.geoObjects
      .add(myPlacemark)
  }
})();




jQuery(function ($) {

  // masked inputs phone
  $('.masked').mask('+7 (999) 999 99 99');

});