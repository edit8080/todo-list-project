"use strict";

const body = document.querySelector("body");
const sortMenuIcons = document.getElementsByClassName("menu-icon");

let isSortByPriority = false;
let isSortByDate = false;

// 3-2. 다른 메뉴창이 열려있으면 닫기
function closeOtherMenu(){
    const otherMenu = document.querySelectorAll(".sort-menu");

    otherMenu.forEach(element => {
        if(!element.classList.contains("display-none"))
            element.classList.add("display-none");
    });
}

// 3-1. 메뉴 아이콘 클릭 시 이벤트 처리(메뉴 열기)
function openSortMenu(event){
    event.stopPropagation();
    closeOtherMenu();

    const category = event.target.parentNode.id;
    const sortMenu = document.querySelector(`#${category} .sort-menu`);

    sortMenu.classList.remove("display-none");
}

// 2. 메뉴 이벤트 설정
function setMenuEvent(category){
    const sortMenu = document.querySelector(`#${category} .sort-menu`);
    const priorityBtn = document.querySelector(`#${category} #${category}__sortBy-priority`);
    const dateBtn = document.querySelector(`#${category} #${category}__sortBy-date`);
    const label = document.querySelectorAll(`#${category} label`);

    sortMenu.addEventListener("click", event => event.stopPropagation());
    label.forEach(element => element.addEventListener("click", event => event.stopPropagation()));

    // 체크박스 선택 이벤트
    priorityBtn.addEventListener("change",function(event){
        event.stopPropagation();
        isSortByPriority = !isSortByPriority;       
    });
    dateBtn.addEventListener("change",function(event){
        event.stopPropagation();
        isSortByDate = !isSortByDate;
    });

    body.addEventListener("click",function(event){
        event.stopPropagation();
        
        if(!sortMenu.classList.contains("display-none"))            
            sortMenu.classList.add("display-none");
    });
}

// 1. 메뉴창 구성 
function createSortMenu(){
    const columns = document.querySelectorAll(".menu-icon");

    columns.forEach(function(element){
        const category = element.parentNode.id;

        element.innerHTML = `  
        <div class="sort-menu display-none">
            <div>Sort By</div>
            <div>
                <label for="${category}__sortBy-priority">
                    <input type="checkbox" name="${category}__sortBy" id="${category}__sortBy-priority"/> priority
                </label>
                
                <label for="${category}__sortBy-date">
                    <input type="checkbox" name="${category}__sortBy" id="${category}__sortBy-date"/> date
                </label>        
            </div>
        </div>`
        setMenuEvent(category);
    });
}
function init(){
    createSortMenu();
}
init();

for(let icon of sortMenuIcons){
    icon.addEventListener("click",openSortMenu);
}