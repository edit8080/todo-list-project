"use strict";

const todoList = document.querySelector(".todo-list");

const IMG_NUMBER = 2;

// 배경 이미지를 랜덤으로 지정
function paintBackground(imgNumber) {
    todoList.style.backgroundImage = `url('../Todo-background ${imgNumber+1}.jpeg')`;
}

function genRandom() {
  return Math.floor(Math.random() * IMG_NUMBER);
}

function init() {
  const randomNumber = genRandom();
  paintBackground(randomNumber);
}

init();
