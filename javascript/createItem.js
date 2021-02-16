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
function setCategoryItem(item){
    const itemElements = document.querySelector(`#${columnName[item.category]}`);
    const itemElement = document.createElement("li");
    itemElement.classList.add("todo-list__item");
    itemElement.innerHTML = `         
            <div class="todo-list__item__title">
                <mark class="highlight-${item.priority}">${item.title}</mark>
            </div>
            <div class="todo-list__item__time">
                ${item.date}
            <i class="far fa-trash-alt"></i>
            </div>`
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