// Object type annotation
//변수명: {속성명: 타입}
function printProfile(person: {
  name: string;
  age: number;
  isMarried?: string; // Optional property
}): void {
  console.log('name:', person.name);
  console.log('age:', person.age);
}

printProfile({ name: 'DongHun, Kim', age: 26 });

// Type alias
type Point = {
  x: number;
  y: number;
};

const point1: Point = { x: 6, y: 9 };

// readonly
type User = {
  readonly id: number;
  name: string;
};

const hyun: User = {
  id: 20201234,
  name: 'JooHyun, Choi',
};

// hyun.id = 20204321; Error!

// Intersection types
type Circle = {
  radius: number;
};

type Colorful = {
  color: string;
};

type ColorfulCircle = Circle & Colorful;

const redBall: ColorfulCircle = {
  radius: 6,
  color: 'red',
};
