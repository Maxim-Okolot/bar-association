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


  (function popup() {
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
  })()

  ymaps.ready(init);

  function init() {

    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
        center: [50.443705, 30.530946],
        zoom: 14
      }, {
        searchControlProvider: 'yandex#search'
      }),
      // Контейнер для меню.
      menu = $('<ul class="menu"/>');

    for (var i = 0, l = groups.length; i < l; i++) {
      createMenuGroup(groups[i]);
    }

    function createMenuGroup (group) {
      // Пункт меню.
      var menuItem = $('<li><a href="#">' + group.name + '</a></li>'),
        // Коллекция для геообъектов группы.
        collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
        // Контейнер для подменю.
        submenu = $('<ul class="submenu"/>');

      // Добавляем коллекцию на карту.
      myMap.geoObjects.add(collection);
      // Добавляем подменю.
      menuItem.append(submenu).appendTo(menu)
        // Добавляем пункт в меню.

        // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
        .find('a')
        .bind('click', function () {
          if (collection.getParent()) {
            myMap.geoObjects.remove(collection);
            submenu.hide();
          } else {
            myMap.geoObjects.add(collection);
            submenu.show();
          }
        });
      for (var j = 0, m = group.items.length; j < m; j++) {
        createSubMenu(group.items[j], collection, submenu);
      }
    }

    function createSubMenu (item, collection, submenu) {
      // Пункт подменю.
      var submenuItem = $('<li><a href="#">' + item.name + '</a></li>'),
        // Создаем метку.
        placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });

      // Добавляем метку в коллекцию.
      collection.add(placemark);
      // Добавляем пункт в подменю.
      submenuItem
        .appendTo(submenu)
        // При клике по пункту подменю открываем/закрываем баллун у метки.
        .find('a')
        .bind('click', function () {
          if (!placemark.balloon.isOpen()) {
            placemark.balloon.open();
          } else {
            placemark.balloon.close();
          }
          return false;
        });
    }

    // Добавляем меню в тэг BODY.
    menu.appendTo($('body'));
    // Выставляем масштаб карты чтобы были видны все группы.
    myMap.setBounds(myMap.geoObjects.getBounds());
  }


  var groups = [
    {
      name: "Адреса",
      style: "islands#redIcon",
      items: [
        {
          center: [50.426472, 30.563022] //г. Москва, ул. Старая Басманная, 15, стр. 2
        },
        {
          center: [50.45351, 30.516489] //г. Калининград, ул. Дмитрия Донского, 17-7
        },
        {
          center: [50.454433, 30.529874] //РК, Астана, ул. Кажымукана, 28
        },
        {
          center: [50.454433, 30.529874] //г. Санкт-Петербург, ул. Днепропетровская, дом 14, офис 26
        },
        {
          center: [50.454433, 30.529874] //. Мурманск, ул. Баумана, д. 47 пом. 50
        },
        {
          center: [50.454433, 30.529874] //225 Broadway Suite 2812 New York, NY 10007
        },
        {
          center: [50.454433, 30.529874] //г. Грозный, ул. Абдаллы 2 Бен Аль-Хусейна (П. Мусорова), 21а
        },
        {
          center: [50.454433, 30.529874] //г. Ростов-на-Дону, пр. Нагибина 40 офис 212
        }
      ]
    }
  ];
})();