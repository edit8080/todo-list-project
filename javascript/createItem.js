"use strict";

const createButtons = document.querySelectorAll(".todo-list__create-item");
const modalBox = document.querySelector(".modal");
const formBackground = document.querySelector(".bg");
const inputForm = document.querySelector(".todo-create");

const ID_STORAGE = "idCount";
const ITEM_STORAGE = "itemStorage"

let todoItems = [];

// todo : loadItem 을 다른 JS 파일로 설정하여 분할


// todo : 카테고리에 맞게 load한 아이템들 배치
function setItemCategory(todoItems){

} 


function loadItem(){
    let loadItems = JSON.parse(localStorage.getItem(ITEM_STORAGE));

    if(loadItems !== null){
        for(const loadItem of loadItems)
            todoItems.push(loadItem);
    }
    setItemCategory(todoItems);
}

function init(){
    loadItem();
}
init();


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
        "id" : `${new Date().getTime()}`,
        "category" : document.querySelector(".modalBox h2").innerText,
        "title" : document.querySelector("#todo-title").value,
        "date" : document.querySelector("#todo-date").value,
        "priority" : document.querySelector("#todo-priority input[type='radio']:checked").value,
        "detail" : document.querySelector("#todo-detail").value
    }
    
    todoItems.push(todoItem);

    localStorage.setItem(ITEM_STORAGE, JSON.stringify(todoItems));

    inputForm.reset();
    modalBox.classList.add("display-none");   
});