"use strict";
const btn = document.getElementById('btn');
const input = document.getElementById('todoinput');
const form = document.querySelector('form');
const list = document.getElementById('todolist');
const handleSubmit = (e) => {
    e.preventDefault();
    const newTodoText = input.value;
    const newLi = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    newLi.append(newTodoText);
    list === null || list === void 0 ? void 0 : list.append(newLi);
    newLi.append(checkbox);
};
form.addEventListener('submit', handleSubmit);
