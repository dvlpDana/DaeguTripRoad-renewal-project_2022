# DaeguTripRoad 리뉴얼 프로젝트(22.06.21 ~ 22.07.01)

![project_1_mockup](https://user-images.githubusercontent.com/102039456/187178605-012489ed-c176-49c9-adc3-9493bd2a83af.jpg)

Demo : [https://dvlpdana.github.io/DaeguTripRoad-renewal-project_2022/](https://dvlpdana.github.io/DaeguTripRoad-renewal-project_2022/)

<br />

## 프로젝트 개발목표

<p align="justify">
-  사용자 요구에 적합한 콘텐츠의 접근성 향상 <br/ >
-  미디어 사이즈에 따른 반응형 퍼블리싱 구현 <br/ >
-  swiper 라이브러리를 현 사이트의 디자인에 맞게 변경하여 사용 <br/ >
</p>

<br />

## 기술 스택

| JavaScript |     CSS     |  HTML  |  JQuery  |
| :--------: | :---------: | :------: | :------: |
|   <img src="https://user-images.githubusercontent.com/102039456/187168448-0611cda1-c3e6-4fd7-bc1c-30da00bab9cd.png" width="35" height="50" >    |   <img src="https://user-images.githubusercontent.com/102039456/187168206-52fac0b8-6c5d-40e5-8f1b-1cb6b2bb22d2.png" width="35" height="50" >    |   <img src="https://user-images.githubusercontent.com/102039456/187180893-3fe76083-5262-4fb8-a4ec-4ed16cae1a79.png" width="35" height="50" >   |   <img src="https://user-images.githubusercontent.com/102039456/187180900-471a7237-e030-46dc-9141-3964a4564106.png" width="50" height="50" >   |

<br>

## Advandced Feature

### 1. OpenWeatherMap API를 사용하여 날씨 데이터를 받아와 대구의 현재 날씨 출력하는 기능 구현
> 코드(common.js)
```javascript
・・・
 function todayWeather() {
    const API_KEY = "personal Key";
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
・・・
```

### 2. JS 내장 함수인 date 사용하여 현재 날짜, 요일, 시간 출력하는 기능구현
> 코드(common.js)
```javascript
  ・・・
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

  ・・・
```
> 구현화면
<img src="https://user-images.githubusercontent.com/102039456/187182141-55e7b664-c949-4da7-a06b-974e7c9fac11.png">

<br />

## 개선사항

<p align="justify">
-  날씨 이미지를 배열에 담아 API에서 받아온 weather 데이터 배열의 index에 따라 이미지 출력 <br/>
-  [여기는 대구] 섹션의 옵션 메뉴 select 태그를 사용하여 재구현 할 것
</p>

<br />

## 라이센스

MIT &copy; [dvlpDana](mailto:colleksql3@gmail.com)


