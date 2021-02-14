"use strict";

const createButtons = document.querySelectorAll(".todo-list__create-item");
const modalBox = document.querySelector(".modal");
const formBackground = document.querySelector(".bg");
const inputForm = document.querySelector(".todo-create");

const ID_STORAGE = "idCount";
const ITEM_STORAGE = "itemStorage"

let idCount = 0;
let todoItems = [];

/* 이벤트 */
 
// New 버튼 클릭
for(const button of createButtons){
    button.addEventListener('click', function(event){
        const category = button.previousSibling.previousSibling.innerText;
        
        document.querySelector(".modalBox h2").innerText = category;
        modalBox.classList.remove("display-none");
    });
};

// Modal 창 배경 클릭
formBackground.addEventListener("click",function(event){
    inputForm.reset();
    modalBox.classList.add("display-none");    
});

// save 버튼 클릭(submit)
inputForm.addEventListener("submit",function(event){  
    event.preventDefault();
 
    const todoItem = {
        "id" : `${idCount}`,
        "category" : document.querySelector(".modalBox h2").innerText,
        "title" : document.querySelector("#todo-title").value,
        "date" : document.querySelector("#todo-date").value,
        "priority" : document.querySelector("#todo-priority input[type='radio']:checked").value,
        "detail" : document.querySelector("#todo-detail").value
    }
    
    todoItems.push(todoItem);

    localStorage.setItem(ID_STORAGE,idCount++);
    localStorage.setItem(ITEM_STORAGE, JSON.stringify(todoItems));


    inputForm.reset();
    modalBox.classList.add("display-none");   
});