// Typeof guards
function triple(value: string | number) {
  if (typeof value === 'string') {
    return value.repeat(3); // value: string
  }
  return value * 3; // value: number
}

// Truthiness guards
const btn = document.getElementById('btn'); // btn: HTMLElement | null
if (btn) {
  btn; // btn: HTMLElement
} else {
  btn; // btn: null
}

// Equality narrowing
function someDemo(x: string | number, y: string | boolean) {
  if (x === y) {
    x; // x: string
    y; // y: string
  }
}

// in operator narrowing
interface Movie {
  title: string;
  duration: number;
}

interface TVShow {
  title: string;
  numEpisodes: number;
  episodeDuration: number;
}

function getRuntime(media: Movie | TVShow) {
  if ('numEpisodes' in media) {
    return media.numEpisodes * media.episodeDuration; // media: TVShow
  }
  media; // media: Movie
}

// instanceof narrowing
function printFullDate(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.toUTCString()); // date: Date
  } else {
    console.log(new Date(date).toUTCString()); // date: string
  }
}

// Type predicates

interface Cat {
  name: string;
  numLives: string;
}

interface Dog {
  name: string;
  breed: string;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).numLives !== undefined;
}

function makeNoise(animal: Cat | Dog): string {
  if (isCat(animal)) {
    animal; // animal: Cat
    return 'Meow';
  } else {
    animal; // animal: Dog
    return 'Bow';
  }
}

// Discriminated unions
interface Rooster {
  name: string;
  weight: number;
  age: number;
  kind: 'rooster';
}

interface Cow {
  name: string;
  weight: number;
  age: number;
  kind: 'cow';
}

interface Pig {
  name: string;
  weight: number;
  age: number;
  kind: 'pig';
}

type FarmAnimal = Pig | Rooster | Cow;

function getFarmAnimalSound(animal: FarmAnimal) {
  switch (animal.kind) {
    case 'rooster':
      animal; // animal: Rooster
      return 'Cockadoodledoo!';
    case 'cow':
      animal; // animal: Cow
      return 'Mooo!';
    case 'pig':
      animal; // animal: Pig
      return 'Oink!';
  }
}
