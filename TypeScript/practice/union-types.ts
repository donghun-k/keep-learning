// Union types
let age: number | string = 26;
age = '26';

// Union types and Arrays
const numbers: (number | string)[] = [1, '2', 3, '4'];

// Type narrowing
function printAge(age: number | string): void {
  console.log(`You are ${age} years old`);
}

function calculate(price: number | string, tax: number): number {
  if (typeof price === 'string') {
    price = Number(price);
  }
  return price * tax;
}

// Literal types
type gender = 'male' | 'female';
const myGender: gender = 'male';
