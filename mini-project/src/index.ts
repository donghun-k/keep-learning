const btn = document.getElementById('btn')!;
const input = document.getElementById('todoinput')! as HTMLInputElement;

btn.addEventListener('click', () => {
  alert(input.value);
  input.value = '';
});
