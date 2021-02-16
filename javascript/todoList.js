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
let updateItemId;

// HTML 수정
function updateHtmlElement(item){
    const updateHtml = document.getElementById(`${item.id}`);

    updateHtml.querySelector("mark").innerText = item.title;
    updateHtml.querySelector("mark").className = `highlight-${item.priority}`;
    updateHtml.querySelector(".todo-list__item__time > span").textContent = `${item.date.replace("T"," ")}`;
}
// 수정된 내용을 localStorage에 반영
function updateItem(event){
    event.preventDefault();

    const itemIndex = todoItems.findIndex((element) => element.id === updateItemId);

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
function updateModalInput(item, event){
    updateItemId = item.id;

    document.querySelector(".modalBox h2").innerText = item.category;
    modalBox.classList.remove("display-none");

    modalBox.querySelector("#todo-title").value = item.title;
    modalBox.querySelector("#todo-date").value = item.date;
    modalBox.querySelector(`#${item.priority}`).checked = true;
    modalBox.querySelector("#todo-detail").value = item.detail;
    
    // 기존 item의 save 버튼 클릭 -> update
    inputForm.removeEventListener("submit",createItem);
    inputForm.addEventListener("submit", updateItem);
}
// 지정한 아이템 삭제 
function deleteItem(event){
    event.stopPropagation();
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
                <span>${item.date.replace("T"," ")}</span>
                <i class="far fa-trash-alt"></i>
            </div>`

    itemElements.appendChild(itemElement);  

    // 수정 이벤트
    itemElement.addEventListener("click",updateModalInput.bind(event, item));
    
    // 삭제 이벤트
    const deleteIcon = itemElement.querySelector("i");
    deleteIcon.addEventListener("click", deleteItem);
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

// save 버튼 최초 클릭 -> create
inputForm.addEventListener("submit",createItem);