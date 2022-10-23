interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById('btn')!;
const input = document.getElementById('todoinput')! as HTMLInputElement;
const form = document.querySelector('form')!;
const list = document.getElementById('todolist')!;

const readTodos = (): Todo[] => {
  const todosJSON = localStorage.getItem('todos');
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
};

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  createTodo(newTodo);
  todos.push(newTodo);

  saveTodos();

  input.value = '';
};

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const createTodo = (todo: Todo) => {
  const newLi = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    saveTodos();
  });
  checkbox.type = 'checkbox';
  newLi.append(todo.text);
  list?.append(newLi);
  newLi.append(checkbox);
};

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

form.addEventListener('submit', handleSubmit);
