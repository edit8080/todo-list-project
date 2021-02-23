"use strict";

import { todoItems } from "./todoList.js";
import { openModalInput } from "./updateItem.js";
import { deleteItem } from "./deleteItem.js";
import { sortColumn } from "./sortItem.js";

const modalBox = document.querySelector(".modal");
const inputForm = document.querySelector(".todo-create");

const ITEM_STORAGE = "itemStorage";

const columnName = {
  "No Status": "no-status",
  "Next Up": "next-up",
  "In Progress": "in-progress",
  Completed: "completed",
};
const itemPriority = ["high", "medium", "low"];

// HTML 요소 생성 (카테고리에 맞게 아이템을 배치)
export function createHtmlElement(item) {
  const itemElements = document.querySelector(`#${item.category} ul`);
  const itemElement = document.createElement("li");

  itemElement.classList.add("todo-list__item");
  itemElement.id = `${item.id}`;
  itemElement.innerHTML = `         
            <div class="todo-list__item__title">
                <mark class="highlight-${
                  itemPriority[Number(item.priority)]
                }">${item.title}</mark>
            </div>
            <div class="todo-list__item__time">
                <span>${item.date.replace("T", " ")}</span>
                <i class="far fa-trash-alt"></i>
            </div>`;

  itemElements.appendChild(itemElement);

  // 수정 이벤트
  itemElement.addEventListener("click", openModalInput.bind(event, item));

  // 삭제 이벤트
  const deleteIcon = itemElement.querySelector("i");
  deleteIcon.addEventListener("click", deleteItem);
}

// 목록 아이템 생성한 후 localStorage에 저장
export function createItem(event) {
  event.preventDefault();

  const todoItem = {
    id: `${new Date().getTime()}`,
    category: columnName[`${document.querySelector(`.modalBox h2`).innerText}`],
    title: document.querySelector("#todo-title").value,
    date: document.querySelector("#todo-date").value,
    priority: document.querySelector(
      "#todo-priority input[type='radio']:checked"
    ).value,
    detail: document.querySelector("#todo-detail").value,
  };

  todoItems.push(todoItem);
  localStorage.setItem(ITEM_STORAGE, JSON.stringify(todoItems));

  const columnNode = document.querySelector(`#${todoItem.category}`);
  sortColumn(columnNode);

  inputForm.reset();

  modalBox.classList.add("display-none");
}
