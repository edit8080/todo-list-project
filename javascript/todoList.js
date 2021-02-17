"use strict";

import {loadItem} from "./loadItem.js";
import {createItem} from "./createItem.js";
import {updateItem} from "./updateItem.js";
import {deleteFromForm} from "./deleteItem.js";

const createButtons = document.querySelectorAll(".todo-list__create-item");
const modalBox = document.querySelector(".modal");
const formBackground = document.querySelector(".bg");
const inputForm = document.querySelector(".todo-create");
const deleteBtn = modalBox.querySelector("#delete-button");

export const todoItems = [];

function init(){
    loadItem();
}
init();

/* 생성 이벤트 */
 
// New 버튼 클릭 -> (모달 창 호출)
for(const button of createButtons){
    button.addEventListener('click', function(event){
        const category = button.previousSibling.previousSibling.innerText;
        
        document.querySelector(".modalBox h2").innerText = category;
        modalBox.classList.remove("display-none");
    });
};

// Modal 창 배경 클릭 -> (모달 창 닫기)
formBackground.addEventListener("click",function(event){
    inputForm.reset();

    inputForm.removeEventListener("submit",createItem); 
    inputForm.removeEventListener("submit",updateItem);
    inputForm.addEventListener("submit",createItem);

    deleteBtn.removeEventListener("click", deleteFromForm);
    
    modalBox.classList.add("display-none");    
});

// save 버튼 최초 클릭 -> create
inputForm.addEventListener("submit",createItem);