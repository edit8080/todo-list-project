"use strict";

const createButtons = document.querySelectorAll(".todo-list__create-item");
const modalBox = document.querySelector(".modal");
const formBackground = document.querySelector(".bg");
const inputForm = document.querySelector(".todo-create");

const ITEM_STORAGE = "itemStorage"
const columnName = {
    "No Status":"no-status",
    "Next Up":"next-up",
    "In Progress":"in-progress",
    "completed":"completed"
}

let todoItems = [];


// 카테고리에 맞게 아이템을 배치 (HTML)
/*
    <li class="todo-list__item">
        <div class="todo-list__item__title">
            <mark>Todo Title</mark>
        </div>
        <div class="todo-list__item__time">
            2021.02.14 13:00:00
            <i class="far fa-trash-alt"></i>
        </div>
    </li>
*/
function setCategoryItem(item){

    // HTML 요소 생성
    const itemElement = document.createElement("li"),
        itemTitleArea = document.createElement("div"),
        itemTitle = document.createElement("mark"),
        itemTime = document.createElement("div"),
        itemIcon = document.createElement("i");

    itemElement.classList.add("todo-list__item");
    itemElement.appendChild(itemTitleArea);
    itemTitleArea.classList.add("todo-list__item__title");
    itemTitleArea.appendChild(itemTitle);
    itemTitle.innerText = item.title;
    itemTitle.classList.add(`highlight-${item.priority}`);

    itemElement.appendChild(itemTime);
    itemTime.classList.add("todo-list__item__time");
    itemTime.innerText = item.date;
    itemTime.appendChild(itemIcon);
    itemIcon.classList.add("far");
    itemIcon.classList.add("fa-trash-alt");

    console.log(columnName[item.category] + `#${columnName[item.category]}`);
    const itemElements = document.querySelector(`#${columnName[item.category]}`);
    itemElements.appendChild(itemElement);

    // todo : 수정, 삭제 이벤트 추가
} 


function loadItem(){
    let loadItems = JSON.parse(localStorage.getItem(ITEM_STORAGE));

    if(loadItems !== null){
        for(const loadItem of loadItems){
            todoItems.push(loadItem);
            setCategoryItem(loadItem);
        }   
    }
}

function init(){
    loadItem();
}
init();


/* 생성 이벤트 */
 
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
        "id" : `${new Date().getTime()}`,
        "category" : document.querySelector(".modalBox h2").innerText,
        "title" : document.querySelector("#todo-title").value,
        "date" : document.querySelector("#todo-date").value,
        "priority" : document.querySelector("#todo-priority input[type='radio']:checked").value,
        "detail" : document.querySelector("#todo-detail").value
    }
    
    todoItems.push(todoItem);
    localStorage.setItem(ITEM_STORAGE, JSON.stringify(todoItems));
    setCategoryItem(todoItem);

    inputForm.reset();
    modalBox.classList.add("display-none");   
});