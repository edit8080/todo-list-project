"use strict";

const clockElement = document.querySelector(".js-clock");

function zeroSetting(time){
    return ("0"+time).slice(-2);
}
function getTime(){
    const date = new Date();  

    clockElement.innerHTML = `
        ${date.getFullYear()}-${zeroSetting(date.getMonth()+1)}-${zeroSetting(date.getDate())} 
        ${zeroSetting(date.getHours())}:${zeroSetting(date.getMinutes())}:${zeroSetting(date.getSeconds())}`;
}

function init(){
    setInterval(getTime, 1000);
}  
init();


