// Classes
class Player {
  constructor(
    public firstName: string,
    public lastName: string,
    private _score: number = 0
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get score(): number {
    return this._score;
  }
  set score(newScore: number) {
    if (newScore < 0) {
      throw new Error("Score can't be negative!");
    }
    this._score = newScore;
  }
}

const donghun = new Player('DongHun', 'Kim');
const joohyun = new Player('Joohyun', 'Choi', 100);

// Classes and Interfaces
interface Colorful {
  color: string;
}
interface Printable {
  print(): void;
}

class Bike implements Colorful {
  constructor(public color: string) {}
}

class Jacket implements Colorful, Printable {
  constructor(public brnad: string, public color: string) {}
  print(): void {
    console.log('Print!');
  }
}

// Abstract classes
abstract class Employee {
  constructor(public firstName: string, public lastName: string) {}
  abstract getPay(): number;
  greet() {
    console.log('Hello!');
  }
}

class FullTimeEmployee extends Employee {
  constructor(firstName: string, lastName: string, private salary: number) {
    super(firstName, lastName);
  }
  getPay(): number {
    return this.salary;
  }
}
class PartTimeEmployee extends Employee {
  constructor(
    firstName: string,
    lastName: string,
    private hourlyRate: number,
    private hoursWorked: number
  ) {
    super(firstName, lastName);
  }
  getPay(): number {
    return this.hourlyRate * this.hoursWorked;
  }
}
