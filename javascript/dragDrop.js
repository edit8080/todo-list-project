import { todoItems } from "./todoList.js";
import { sortColumn } from "./sortItem.js";

const itemLists = document.querySelectorAll(".todo-list__items");

const ITEM_STORAGE = "itemStorage";

// 1. Item Drag
export function itemDrag(e) {
  e.dataTransfer.setData("text", e.target.id);
}

// 2-1. Drag한 Item을 놓았을 때
function itemAllowDrop(e) {
  e.preventDefault();
}

// Drop 했을 때 카테고리 목록 탐색
function findCategory(node) {
  if (Array.from(itemLists).includes(node)) return node;

  return findCategory(node.parentNode);
}

// 2-2. Drag 한 Item을 카테고리에 배치
function itemDrop(e) {
  e.preventDefault();

  const dropToList = findCategory(e.target);
  const dropListCategory = dropToList.parentNode.id;
  const list = dropToList.querySelector("ul");

  let dataId = e.dataTransfer.getData("text");
  list.appendChild(document.getElementById(dataId));

  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === dataId) {
      const element = todoItems.splice(i, 1);

      element[0].category = dropListCategory;
      todoItems.push(element[0]);
      break;
    }
  }

  localStorage.setItem(ITEM_STORAGE, JSON.stringify(todoItems));

  const columnNode = document.querySelector(`#${dropListCategory}`);
  sortColumn(columnNode);
}

for (let itemList of itemLists) {
  itemList.addEventListener("drop", itemDrop);
  itemList.addEventListener("dragover", itemAllowDrop);
}
