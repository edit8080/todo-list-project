"use strict";

const form = document.querySelector(".js-username");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_NAME = "username",
  NO_DISPLAY = "display-none";

function saveName(text) {
  localStorage.setItem(USER_NAME, text);
}
function submitHandler(event) {
  event.preventDefault();
  const userName = input.value;

  paintGreeting(userName);
  saveName(userName);
}
function paintGreeting(text) {
  form.classList.add(NO_DISPLAY);
  greeting.classList.remove(NO_DISPLAY);
  greeting.innerText = `Don't Give Up, ${text}!!`;
}
function askForName() {
    form.classList.remove(NO_DISPLAY);
    form.addEventListener("submit", submitHandler);
  }
function loadName() {
  const loadUserName = localStorage.getItem(USER_NAME);
  if (loadUserName === null) {
    askForName();
  } else {
    paintGreeting(loadUserName);
  }
}
function init() {
  loadName();
}
init();
