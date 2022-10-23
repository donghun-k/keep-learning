"use strict";
const btn = document.getElementById('btn');
const input = document.getElementById('todoinput');
const form = document.querySelector('form');
const list = document.getElementById('todolist');
const readTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
};
const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
};
const createTodo = (todo) => {
    const newLi = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    newLi.append(todo.text);
    list === null || list === void 0 ? void 0 : list.append(newLi);
    newLi.append(checkbox);
};
const todos = readTodos();
todos.forEach(createTodo);
form.addEventListener('submit', handleSubmit);
