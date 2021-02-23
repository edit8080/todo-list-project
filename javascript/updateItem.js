"use strict";

import { todoItems } from "./todoList.js";
import { createItem } from "./createItem.js";
import { deleteFromForm } from "./deleteItem.js";
import { sortColumn } from "./sortItem.js";

const modalBox = document.querySelector(".modal");
const inputForm = document.querySelector(".todo-create");
const deleteBtn = modalBox.querySelector("#delete-button");

const itemPriority = ["high", "medium", "low"];

export let selectedItemId;

// HTML 수정
function updateHtmlElement(item) {
  const updateHtml = document.getElementById(`${item.id}`);

  updateHtml.querySelector("mark").innerText = item.title;
  updateHtml.querySelector("mark").className = `highlight-${
    itemPriority[Number(item.priority)]
  }`;
  updateHtml.querySelector(
    ".todo-list__item__time > span"
  ).textContent = `${item.date.replace("T", " ")}`;
}
// 수정된 내용을 localStorage에 반영
export function updateItem(event) {
  event.preventDefault();

  const ITEM_STORAGE = "itemStorage";
  const itemIndex = todoItems.findIndex(
    (element) => element.id === selectedItemId
  );
  const item = todoItems[itemIndex];

  item.title = document.querySelector("#todo-title").value;
  item.date = document.querySelector("#todo-date").value;
  item.priority = document.querySelector(
    "#todo-priority input[type='radio']:checked"
  ).value;
  item.detail = document.querySelector("#todo-detail").value;

  localStorage.setItem(ITEM_STORAGE, JSON.stringify(todoItems));
  inputForm.reset();

  modalBox.classList.add("display-none");
  inputForm.removeEventListener("submit", updateItem);
  inputForm.addEventListener("submit", createItem);

  updateHtmlElement(item);

  const columnNode = document.querySelector(`#${item.category}`);
  sortColumn(columnNode);
}
// 모달 창 open (기존 값 유지)
export function openModalInput(item) {
  selectedItemId = item.id;

  document.querySelector(".modalBox h2").innerText = item.category;
  modalBox.classList.remove("display-none");

  modalBox.querySelector("#todo-title").value = item.title;
  modalBox.querySelector("#todo-date").value = item.date;
  modalBox.querySelector(
    `#${itemPriority[Number(item.priority)]}`
  ).checked = true;
  modalBox.querySelector("#todo-detail").value = item.detail;

  // 기존 item form의 save 버튼 클릭 -> update
  inputForm.removeEventListener("submit", createItem);
  inputForm.addEventListener("submit", updateItem);

  // form의 delete 버튼 클릭
  deleteBtn.addEventListener("click", deleteFromForm);
}
