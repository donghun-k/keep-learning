// Interfaces
interface Person {
  readonly id: number;
  name: string;
  age: number;
  isMarried?: boolean;
  sayHi: () => string;
}

// Interface methods
interface Product {
  name: string;
  price: number;
  applyDiscount: (discount: number) => number;
  // applyDiscount(discount: number): number;
}

// Extending interfaces
interface Man {
  name: string;
  age: number;
}

interface Hero {
  heroName: string;
}

interface Avengers extends Man, Hero {
  position: string;
}

const cap: Avengers = {
  name: 'Steve Rogers',
  age: 179,
  position: 'Leader',
  heroName: 'Captain America',
};

// Type alias and Interface
type Color = string;
// interface Color = string; Error!

type HumanType = {
  name: string;
};
// type HumanType = {
//   age: number;
// }; Error!

interface HumanInterface {
  name: string;
}

interface HumanInterface {
  age: number;
}

const donghun: HumanInterface = {
  name: 'Donghun, Kim',
  age: 26,
};
