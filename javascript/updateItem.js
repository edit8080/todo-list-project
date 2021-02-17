"use strict"

import {todoItems} from "./todoList.js";
import {createItem} from "./createItem.js";
import {deleteFromForm} from "./deleteItem.js";

const modalBox = document.querySelector(".modal");
const inputForm = document.querySelector(".todo-create");
const deleteBtn = modalBox.querySelector("#delete-button");

export let selectedItemId;

// HTML 수정
function updateHtmlElement(item){
    const updateHtml = document.getElementById(`${item.id}`);

    updateHtml.querySelector("mark").innerText = item.title;
    updateHtml.querySelector("mark").className = `highlight-${item.priority}`;
    updateHtml.querySelector(".todo-list__item__time > span").textContent = `${item.date.replace("T"," ")}`;
}
// 수정된 내용을 localStorage에 반영
export function updateItem(event){
    event.preventDefault();

    const ITEM_STORAGE = "itemStorage"
    const itemIndex = todoItems.findIndex((element) => element.id === selectedItemId);

    todoItems[itemIndex].title = document.querySelector("#todo-title").value;
    todoItems[itemIndex].date = document.querySelector("#todo-date").value;
    todoItems[itemIndex].priority = document.querySelector("#todo-priority input[type='radio']:checked").value;
    todoItems[itemIndex].detail = document.querySelector("#todo-detail").value;

    localStorage.setItem(ITEM_STORAGE, JSON.stringify(todoItems));
    inputForm.reset();
    
    modalBox.classList.add("display-none");    
    inputForm.removeEventListener("submit",updateItem);
    inputForm.addEventListener("submit", createItem);

    updateHtmlElement(todoItems[itemIndex]);
}
// 모달 창 open (기존 값 유지)
export function openModalInput(item){
    selectedItemId = item.id;

    document.querySelector(".modalBox h2").innerText = item.category;
    modalBox.classList.remove("display-none");

    modalBox.querySelector("#todo-title").value = item.title;
    modalBox.querySelector("#todo-date").value = item.date;
    modalBox.querySelector(`#${item.priority}`).checked = true;
    modalBox.querySelector("#todo-detail").value = item.detail;
    
    // 기존 item form의 save 버튼 클릭 -> update
    inputForm.removeEventListener("submit",createItem);
    inputForm.addEventListener("submit", updateItem);

    // form의 delete 버튼 클릭
    deleteBtn.addEventListener("click", deleteFromForm);
}