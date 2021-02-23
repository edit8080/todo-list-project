"use strict";

import { todoItems } from "./todoList.js";
import { createHtmlElement } from "./createItem.js";

const body = document.querySelector("body");
const sortMenuIcons = document.getElementsByClassName("menu-icon");
const columns = document.querySelectorAll(".todo-list__column");

const categoryItem = {
  "no-status": [],
  "next-up": [],
  "in-progress": [],
  completed: [],
};
let isSortByPriority = {
  "no-status": false,
  "next-up": false,
  "in-progress": false,
  completed: false,
};
let isSortByDate = {
  "no-status": false,
  "next-up": false,
  "in-progress": false,
  completed: false,
};

// 4-2-c. 정렬 기준
function compareByDouble(a, b) {
  const aPriority = parseInt(a.priority);
  const bPriority = parseInt(b.priority);

  const aTimeStamp = new Date(a.date).getTime();
  const bTimeStamp = new Date(b.date).getTime();

  return aPriority < bPriority
    ? 1
    : aPriority > bPriority
    ? -1
    : aTimeStamp < bTimeStamp
    ? 1
    : aTimeStamp > bTimeStamp
    ? -1
    : 0;
}

function compareByDate(a, b) {
  const aTimeStamp = new Date(a.date).getTime();
  const bTimeStamp = new Date(b.date).getTime();

  return aTimeStamp < bTimeStamp ? 1 : aTimeStamp > bTimeStamp ? -1 : 0;
}

function compareByPriority(a, b) {
  const aPriority = parseInt(a.priority);
  const bPriority = parseInt(b.priority);

  return aPriority < bPriority ? 1 : aPriority > bPriority ? -1 : 0;
}

// 4-2-c. 정렬 후 배치
function sortCategoryItem(columnNode) {
  const category = columnNode.id;

  if (isSortByPriority[`${category}`] && isSortByDate[`${category}`]) {
    categoryItem[`${category}`].sort(compareByDouble);
  } else if (isSortByPriority[`${category}`]) {
    categoryItem[`${category}`].sort(compareByPriority);
  } else if (isSortByDate[`${category}`]) {
    categoryItem[`${category}`].sort(compareByDate);
  }

  categoryItem[`${category}`].forEach((item) => {
    createHtmlElement(item);
  });
}
// 4-2-b. column 초기화
function initColumn(columnNode) {
  const columnItemList = columnNode.querySelector(".todo-list__items > ul");
  columnItemList.innerText = "";
}
// 4-2-a. Item 분류
function classifyItem(columnNode) {
  const category = columnNode.id;

  categoryItem[`${category}`].length = 0;

  todoItems.forEach((item) => {
    if (item.category === category) {
      categoryItem[`${category}`].push(item);
    }
  });
}
// 4-2. 선택한 column 정렬 (Item 분류 -> column 초기화 -> 정렬 후 배치)
export function sortColumn(columnNode) {
  classifyItem(columnNode);
  initColumn(columnNode);
  sortCategoryItem(columnNode);
}

// 4-1. 해당 column 선택
function hasChildNode(nodeId) {
  for (const column of columns)
    if (column.querySelector(`#${nodeId}`) !== null) return column;
}

// 3-2. 다른 메뉴창이 열려있으면 닫기
function closeOtherMenu() {
  const otherMenu = document.querySelectorAll(".sort-menu");

  otherMenu.forEach((element) => {
    if (!element.classList.contains("display-none"))
      element.classList.add("display-none");
  });
}

// 3-1. 메뉴 아이콘 클릭 시 이벤트 처리(메뉴 열기)
function openSortMenu(event) {
  event.stopPropagation();
  closeOtherMenu();

  const category = event.target.parentNode.id;
  const sortMenu = document.querySelector(`#${category} .sort-menu`);

  sortMenu.classList.remove("display-none");
}

// 2. 메뉴 이벤트 설정
function setMenuEvent(category) {
  const sortMenu = document.querySelector(`#${category} .sort-menu`);
  const priorityBtn = document.querySelector(
    `#${category} #${category}__sortBy-priority`
  );
  const dateBtn = document.querySelector(
    `#${category} #${category}__sortBy-date`
  );
  const label = document.querySelectorAll(`#${category} label`);

  sortMenu.addEventListener("click", (event) => event.stopPropagation());
  label.forEach((element) =>
    element.addEventListener("click", (event) => event.stopPropagation())
  );

  // 체크박스 선택 이벤트
  priorityBtn.addEventListener("change", function (event) {
    event.stopPropagation();

    const columnNode = hasChildNode(event.target.id);
    isSortByPriority[`${columnNode.id}`] = !isSortByPriority[
      `${columnNode.id}`
    ];
    sortColumn(columnNode);
  });

  dateBtn.addEventListener("change", function (event) {
    event.stopPropagation();

    const columnNode = hasChildNode(event.target.id);
    isSortByDate[`${columnNode.id}`] = !isSortByDate[`${columnNode.id}`];

    sortColumn(columnNode);
  });

  body.addEventListener("click", function (event) {
    event.stopPropagation();

    if (!sortMenu.classList.contains("display-none"))
      sortMenu.classList.add("display-none");
  });
}

// 1. 메뉴창 구성
function createSortMenu() {
  const columns = document.querySelectorAll(".menu-icon");

  columns.forEach(function (element) {
    const category = element.parentNode.id;

    element.innerHTML = `  
        <div class="sort-menu display-none">
            <div>Sort By</div>
            <div>
                <label for="${category}__sortBy-priority">
                    <input type="checkbox" name="${category}__sortBy" id="${category}__sortBy-priority"/> priority
                </label>
                
                <label for="${category}__sortBy-date">
                    <input type="checkbox" name="${category}__sortBy" id="${category}__sortBy-date"/> date
                </label>        
            </div>
        </div>`;
    setMenuEvent(category);
  });
}

function init() {
  createSortMenu();
}
init();

Array.from(sortMenuIcons).forEach((icon) =>
  icon.addEventListener("click", openSortMenu)
);
