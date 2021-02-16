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
    "Completed":"completed"
}

const todoItems = [];

// 지정한 아이템 삭제 
function deleteItem(event){
    const itemElement = event.target.parentNode.parentNode;

    // localStorage 삭제
    const itemIndex = todoItems.findIndex((element) => element.id === itemElement.id);
    todoItems.splice(itemIndex,1);

    localStorage.setItem(ITEM_STORAGE,JSON.stringify(todoItems));

    // HTML 요소 삭제
    itemElement.remove();
}

// HTML 요소 생성 (카테고리에 맞게 아이템을 배치)
function createHtmlElement(item){
    const itemElements = document.querySelector(`#${columnName[item.category]}`);
    const itemElement = document.createElement("li");

    itemElement.classList.add("todo-list__item");
    itemElement.id = `${item.id}`;
    itemElement.innerHTML = `         
            <div class="todo-list__item__title">
                <mark class="highlight-${item.priority}">${item.title}</mark>
            </div>
            <div class="todo-list__item__time">
                ${item.date.replace("T"," ")}
            <i class="far fa-trash-alt"></i>
            </div>`
     
    // todo : 수정, 삭제 이벤트 추가
    const deleteIcon = itemElement.querySelector("i");
    deleteIcon.addEventListener("click", deleteItem);

    itemElements.appendChild(itemElement);  
} 

// 목록 아이템 생성한 후 localStorage에 저장
function createItem(event){
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
    createHtmlElement(todoItem);

    inputForm.reset();
    modalBox.classList.add("display-none");   
}

// localStorage 로드
function loadItem(){
    let loadItems = JSON.parse(localStorage.getItem(ITEM_STORAGE));

    if(loadItems !== null){
        for(const loadItem of loadItems){
            todoItems.push(loadItem);
            createHtmlElement(loadItem);
        }   
    }
}

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
    modalBox.classList.add("display-none");    
});

// save 버튼 클릭(submit) -> localStorage 저장
inputForm.addEventListener("submit",createItem);