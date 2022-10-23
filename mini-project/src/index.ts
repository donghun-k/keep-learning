const btn = document.getElementById('btn')!;
const input = document.getElementById('todoinput')! as HTMLInputElement;
const form = document.querySelector('form')!;
const list = document.getElementById('todolist')!;

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const newTodoText = input.value;
  const newLi = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  newLi.append(newTodoText);
  list?.append(newLi);
  newLi.append(checkbox);
};

form.addEventListener('submit', handleSubmit);
