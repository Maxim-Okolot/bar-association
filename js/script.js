jQuery(function ($) {

  // masked inputs phone
  $('.masked').mask('+7 (999) 999 99 99');

});


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
        slidesPerView: 4,
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

        if (popup.classList.contains('quiz')) {
          let items = document.querySelectorAll('.quiz-slide');
          let prev = document.querySelector('#quiz-prev');
          let next = document.querySelector('#quiz-next');
          let inputs = document.querySelectorAll('.quiz-slides input');
          let currentSlide = document.querySelector("#progress-value");

          for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "radio") {
              inputs[i].checked = false;
            } else {
              inputs[i].value = '';
            }
          }


          for (let i = 0; i < items.length; i++) {
            items[i].classList.add('hide');
          }

          items[0].classList.remove('hide');

          prev.classList.add('hide');
          next.classList.add('hide');
          next.type = 'button';

          currentSlide.innerHTML = 1;
        }

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

        if (inputs[0].type !== "radio") {
          next.classList.add('disable');
          next.classList.remove('hide');

          window.addEventListener('click', function (event) {
            if (event.target.classList.contains('quiz-nav__next')) {
              if (inputs[0].value !== '') {
                next.type = 'submit';
                next.classList.remove('disable');
              }
            }
          })
        } else {
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('change', function () {
              next.classList.remove('hide');
            })
          }
        }
      }

      validation();

     next.addEventListener('click', function () {
       setTimeout(function () {
         if (!next.classList.contains('disable')) {
           if (currentSlide < items.length) {
             for (let i = 0; i < items.length; i++) {
               items[i].classList.add('hide');
             }

             items[currentSlide].classList.remove('hide');
             next.classList.add('hide');

             currentSlide++;

             if (currentSlide < items.length) {
               validation();
               value.innerHTML = currentSlide;
             }

             progress.style.width = 100 / items.length * currentSlide + "%";

             if (currentSlide > 1 && currentSlide !== items.length) {
               prev.classList.remove('hide');
             } else {
               prev.classList.add('hide');
             }

           }
         }
       }, 50);
     })

      prev.addEventListener('click', function () {
        next.classList.remove('hide', 'disable');

        if (currentSlide >= 1) {

          for (let i = 0; i < items.length; i++) {
            items[i].classList.add('hide');
          }

          let inputs = document.getElementsByName(`steep-${currentSlide}`);

          if (inputs[0].type === "radio") {
            for (let i = 0; i < inputs.length; i++) {
              inputs[i].checked = false;
            }
          }

          currentSlide = currentSlide - 1;
          value.innerHTML = currentSlide;
          progress.style.width = 100 / items.length * currentSlide + "%";
          items[currentSlide - 1].classList.remove('hide');

          if (currentSlide === 1) {
            prev.classList.add('hide');
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

  function init () {
    var myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10
      }, {
        searchControlProvider: 'yandex#search'
      }),
      objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
      });

    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);

    $.ajax({
      url: "https://maxim-okolot.github.io/bar-association/js/locations.json"
    }).done(function(data) {
      objectManager.add(data);
    });

  }
})();