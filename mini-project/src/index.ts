const btn = document.getElementById('btn')!;
const input = document.getElementById('todoinput')! as HTMLInputElement;
const form = document.querySelector('form')!;

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  console.log('Submitted!');
};

form.addEventListener('submit', handleSubmit);
