"use strict";

(() => {
function addItem(text, done){
  const item = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const button = document.createElement('button');
  label.textContent = text;
  input.type = "checkbox";
  input.checked = done;
  input.id = `todo${todo.querySelectorAll('li').length + 1}`;
  input.addEventListener('input', ev => {
    saveToStorage();
  });

  label.htmlFor = input.id;
  button.textContent = "×";
  button.addEventListener('click', ev => {
    item.remove();
    saveToStorage(); // <-- this is a new line
  });

  item.appendChild(input);
  item.appendChild(label);
  todo.appendChild(item);
  item.appendChild(button);
}

add.addEventListener('click', ev => {
  if(text.value) {      // check we have data
    addItem(text.value);
    text.value = null;  // clear the input
    text.focus();       // give it the focus
    saveToStorage(); // <-- this is a new line
  }
})

text.addEventListener('keydown', ev => {
  if(ev.key == "Enter") {
    add.click();
  }
});

function clearList() {
  while(todo.firstChild) {
    todo.removeChild(todo.firstChild);
  }
}

clear.addEventListener('click', ev => {
  if(confirm("Are you sure you want to delete the entire list?")) {
     clearList();
     saveToStorage(); // <-- this is a new line
   }
});

function saveToStorage() {
  const elements = Array.from(todo.querySelectorAll('li'));
  const data = elements.map(el => {
    return {
      text: el.querySelector('label').textContent,
      done: el.querySelector('input').checked
    }
  });
  localStorage.setItem(todo.id, JSON.stringify(data));
}

function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem(todo.id));
  	if(data) {
  		clearList();
  		for (const item of data) {
  			addItem(item.text, item.done);
  		}
  	}
}

loadFromStorage();
})()
