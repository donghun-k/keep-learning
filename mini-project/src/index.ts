interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById('btn')!;
const input = document.getElementById('todoinput')! as HTMLInputElement;
const form = document.querySelector('form')!;
const list = document.getElementById('todolist')!;

const todos: Todo[] = [];

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  createTodo(newTodo);
  todos.push(newTodo);
};

const createTodo = (todo: Todo) => {
  const newLi = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  newLi.append(todo.text);
  list?.append(newLi);
  newLi.append(checkbox);
};

form.addEventListener('submit', handleSubmit);
