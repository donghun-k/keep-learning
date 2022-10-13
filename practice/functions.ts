// Function parameter annotation
function square(num: number) {
  return num * num;
}
square(3);

// Return type annotation
function greet(person: string = 'stranger'): string {
  return `Hello, ${person}!`;
}

greet('donghun');

// Void type
function printTwice(msg: string): void {
  console.log(msg);
  console.log(msg);
}

// Never type
function makeError(msg: string): never {
  throw new Error(msg);
}

function neverStop(): never {
  while (true) {
    console.log("Don't stop me now~");
  }
}
// Anonymous function contextual typing
const colors = ['red', 'green', 'blue'];
colors.map((color) => {
  // 문맥을 읽어 자동으로 color를 string으로 타입 지정
  return color.toUpperCase();
});
