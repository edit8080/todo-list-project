"use strict"

import {todoItems} from "./todoList.js";
import {createItem} from "./createItem.js";
import {selectedItemId, updateItem} from "./updateItem.js";

const modalBox = document.querySelector(".modal");
const inputForm = document.querySelector(".todo-create");
const deleteBtn = modalBox.querySelector("#delete-button");

const ITEM_STORAGE = "itemStorage";

// form의 delete 버튼 클릭
export function deleteFromForm(event){
    const itemIndex = todoItems.findIndex((element) => element.id === selectedItemId);
    todoItems.splice(itemIndex,1);

    localStorage.setItem(ITEM_STORAGE,JSON.stringify(todoItems));

    document.getElementById(`${selectedItemId}`).remove();

    inputForm.removeEventListener("submit",updateItem);
    inputForm.addEventListener("submit", createItem);

    deleteBtn.removeEventListener("click", deleteFromForm);

    inputForm.reset();
    modalBox.classList.add("display-none");    
}

// 지정한 아이템 삭제 
export function deleteItem(event){
    event.stopPropagation();
    const itemElement = event.target.parentNode.parentNode;

    // localStorage 삭제
    const itemIndex = todoItems.findIndex((element) => element.id === itemElement.id);
    todoItems.splice(itemIndex,1);

    localStorage.setItem(ITEM_STORAGE,JSON.stringify(todoItems));

    // HTML 요소 삭제
    itemElement.remove();
}