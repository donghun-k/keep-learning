// Interfaces
interface Point {
  x: number;
  y: number;
}

const pt: Point = { x: 100, y: 150 };

// Optional properties and readonly
interface Person {
  readonly id: number;
  name: string;
  age: number;
  isMarried?: boolean;
}
