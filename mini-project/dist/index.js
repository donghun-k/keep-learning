"use strict";
const btn = document.getElementById('btn');
const input = document.getElementById('todoinput');
const form = document.querySelector('form');
const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted!');
};
form.addEventListener('submit', handleSubmit);
