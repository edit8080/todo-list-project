import { todoItems } from "./todoList.js";
import { createHtmlElement } from "./createItem.js";

const ITEM_STORAGE = "itemStorage";

// localStorage 로드
export function loadItem() {
  let loadItems = JSON.parse(localStorage.getItem(ITEM_STORAGE));

  if (loadItems !== null) {
    for (const loadItem of loadItems) {
      todoItems.push(loadItem);
      createHtmlElement(loadItem);
    }
  }
}
