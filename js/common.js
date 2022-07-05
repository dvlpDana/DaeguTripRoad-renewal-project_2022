$(function () {
  // header, bars, btn_plus에 span 붙이기
  $('header').prepend('<div class="nav_bg"></div>');
  $('.bars').append('<span></span><span></span><span></span>');
  $('.btn_plus').append('<span></span><span></span>')

  // icon_search 기능구현
  $('.icon_search').on('click', function () {
    $('.search-area').slideDown(300)
  })

  $('.btn_close').on('click', function (e) {
    $('.search-area').slideUp(300)
    e.preventDefault(e);
  })

  // icon_language 기능구현
  $('.icon_language').on('mouseover', function () {
    $('.language').slideDown(300, 'linear')
  })

  $('.language').on('mouseout', function () {
    $('.language').slideUp(300, 'linear')
  })

  // scroll event 제한 ON
  function scrollPreventOn() {
    $('.mobile-wrap').on('scroll touchmove mousewheel', function (e) {
      e.preventDefault();
      e.stopPropagation();
    })
  }

  // scroll event 제한 OFF
  function scrollPreventOff() {
    $('.mobile-wrap').off('scroll touchmove mousewheel');
  }


  // bar 버튼 클릭 시, 모바일 메뉴 기능 구현

  // $('.bars').on('click', function () {
  //   const btnName = $(this).attr('class');
  //   if (btnName !== 'on') {
  //     $(this).toggleClass('on')
  //     $('.global-nav').toggleClass('on')
  //     $('.nav_bg').fadeToggle(300)
  //     scrollPreventOn()
  //   } else {
  //     scrollPreventOff()
  //   }
  // })

  $('.bars').on('click', function () {
    $(this).addClass('on')
    $('.global-nav').addClass('on')
    $('.nav_bg').fadeIn(300)
    $('.closeMenu').addClass('on')
    scrollPreventOn()
  })

  $('.closeMenu').on('click', function() {
    $(this).removeClass('on')
    $('.bars').removeClass('on')
    $('.global-nav').removeClass('on')
    $('.nav_bg').fadeOut(300)
    scrollPreventOff()
  })

  //메뉴 기능 구현(모바일, 웹)
  $('.second-depth-menu>ul>li>a').on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
  })

  $('.first-depth-menu>li').on('click', function () {
    if ($(this).attr('class') !== 'on') {
      $('.second-depth-menu').slideUp(300)
      $(this).find('.second-depth-menu').slideToggle(300)
      $('.first-depth-menu>li').removeClass('on')
      $(this).addClass('on')
    } else {
      $(this).find('.second-depth-menu').slideToggle(300)
      $('.first-depth-menu>li').removeClass('on')
    }
  })

  $('.second-depth-menu>ul>li>a').on('click', function () {
    $(this).next('ol').slideToggle(300)
  })

  // sec-hero swiper 기능구현
  const heroSlide = new Swiper(".heroSlide", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next.heroNext",
      prevEl: ".swiper-button-prev.heroPrev",
    },
    pagination: {
      el: ".swiper-pagination.heroPagenation",
      clickable: true,
    },
  });

  //sec-slide 날짜 및 시계, 날씨 기능 구현

  // 1)실시간 날짜 및 시계 기능 구현
  const dateEl = document.querySelector("#todayDate")

  function timeLoad() {
    const todayDate = new Date();
    // const month = todayDate.getMonth() + 1;
    // const date = todayDate.getDate();      
    // const hours = todayDate.getHours();
    // const minutes = todayDate.getSeconds();

    // padding start로 두 자리수 만들기
    const month = String(todayDate.getMonth() + 1).padStart(2, "0");
    const date = String(todayDate.getDate()).padStart(2, "0");
    const hours = String(todayDate.getHours()).padStart(2, "0");
    const minutes = String(todayDate.getSeconds()).padStart(2, "0");

    //요일 구하기
    const weekday = ['일', '월', '화', '수', '목', '금', '토'];
    const day = weekday[todayDate.getDay()];

    // dateEl.innerText = `${month < 10 ? `0${month}` : month}.${date} ${day} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    dateEl.innerText = `${month}.${date} ${day} ${hours}:${minutes}`
  }

  timeLoad();

  setInterval(timeLoad, 1000)


  // 2)현재 위치에 기반한 날씨 기능 구현
  function todayWeather() {
    const API_KEY = "841d516d563f1e37a4e4d92741146c7a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Daegu,%20KR&appid=${API_KEY}&units=metric`;

    console.log(url)

    fetch(url).then(response => response.json())
      .then(data => {
        const weatherEl = document.querySelector('#weather');
        const climinateEl = document.querySelector('#climinate')

        weatherEl.innerText = data.weather[0].main;
        climinateEl.innerText = `${data.main.temp}°C`

      });
  }

  todayWeather();

  // 모바일 버전 quick 메뉴 기능구현
  let windowWidth = $(window).width();
  let quickSlide = undefined;

  function quickSlideInit() {
    if (windowWidth < 850 && quickSlide === undefined) {
      quickSlide = new Swiper(".quickSlide", {
        rewind: true,
        grabCursor: true,
        slidesPerView: 4,
        spaceBetween: 12,
        loop: true,


        breakpoints: {
          400: {
            slidesPerView: 6,
            spaceBetween: 12
          }
        }
      });
    } else if (windowWidth >= 850 && quickSlide !== undefined) {
      quickSlide.destroy();
      quickSlide = undefined;
    }
  };

  quickSlideInit();

  $(window).on('resize', function () {
    windowWidth = $(window).width();
    quickSlideInit();
  });



  // tour 슬라이드 기능구현
  let tourSlideWidth = $('.tourSlide>li').innerWidth()

  $(window).on('resize', function () {
    tourSlideWidth = $('.tourSlide>li').innerWidth()
  })


  function nextMoodAni() {
    $('.moodTour .tourSlide').animate({
      marginLeft: -tourSlideWidth
    }, 700, function () {
      $('.moodTour .tourSlide>li').eq(0).appendTo('.moodTour .tourSlide')
      $('.moodTour .tourSlide').css({
        marginLeft: 0
      })
    })
  }

  function prevMoodAni() {
    $('.moodTour .tourSlide>li').eq(-1).prependTo('.moodTour .tourSlide')
    $('.moodTour .tourSlide').css({
      marginLeft: -tourSlideWidth
    })
    $('.moodTour .tourSlide').animate({
      marginLeft: 0
    }, 700)
  }

  $('.moodPrev').on('click', function () {
    prevMoodAni()
  })

  $('.moodNext').on('click', function () {
    nextMoodAni()
  })


  function nextFoodAni() {
    $('.foodTour .tourSlide').animate({
      marginLeft: -tourSlideWidth
    }, 700, function () {
      $('.foodTour .tourSlide>li').eq(0).appendTo('.foodTour .tourSlide')
      $('.foodTour .tourSlide').css({
        marginLeft: 0
      })
    })
  }

  function prevFoodAni() {
    $('.foodTour .tourSlide>li').eq(-1).prependTo('.foodTour .tourSlide')
    $('.foodTour .tourSlide').css({
      marginLeft: -tourSlideWidth
    })
    $('.foodTour .tourSlide').animate({
      marginLeft: 0
    }, 700)
  }

  $('.foodPrev').on('click', function () {
    prevFoodAni()
  })

  $('.foodNext').on('click', function () {
    nextFoodAni()
  })



  // sec-tour 탭 버튼 기능 구현
  $('.tourHashTags>span').on('click', function () {
    $('.tourHashTags>span').removeClass('on')
    $(this).addClass('on')

    let idx = $(this).index()

    $('.tourList').removeClass('on')
    $('.tourList').eq(idx).addClass('on')
  })

  //sec-course 탭 버튼 기능구현
  $('.course_tab-btn>li').on('click', function () {
    $('.course_tab-btn>li').removeClass('on')
    $(this).addClass('on')

    let idx = $(this).index()

    $('.map-list>li').removeClass('on')
    $('.map-list>li').eq(idx).addClass('on')
    $('.course-list>li').removeClass('on')
    $('.course-list>li').eq(idx).addClass('on')
  })

  //sec-info tourplan 서브메뉴 기능구현
  $('.tour-plan_con>li').on('click', function (e) {
    $(this).toggleClass('on');
    $(this).find('.plan_sub-menu').slideToggle(300, 'linear');
  })
})