"use strict";

const weather = document.querySelector(".js-weather");

const API_KEY = "31a06584c3da29410c35f000436236c6";
const COORDS = "coords";

// openweathermap을 통한 날씨 정보 
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      console.log(json.weather[0].main);
      weather.innerText = `${temperature} ℃ @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function GeoSuccessHandler(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function GeoErrorHandler(error) {
  console.log(error);
}
// 위치 정보 불러오기
function askForCoords() {
  navigator.geolocation.getCurrentPosition(GeoSuccessHandler, GeoErrorHandler);
}

function loadCoords() {
  const loadCords = localStorage.getItem(COORDS);
  if (loadCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
