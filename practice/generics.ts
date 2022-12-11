// Generics

function getRandomElement<T>(list: T[]): T {
  const randIdx = Math.floor(Math.random() * list.length);
  return list[randIdx];
}

const randChar = getRandomElement<string>(['a', 'b', 'c']);
const randNum = getRandomElement([1, 2, 3]); // Type inference

const inputEl = document.querySelector<HTMLInputElement>('#username'); // Type inference 불가능

// Generic with multiple types
function merge<T, U>(obj1: T, obj2: U) {
  return {
    ...obj1,
    ...obj2,
  };
}

const comboObj = merge({ name: 'DongHun' }, { age: 26 });

// Type constraints
interface Person {
  name: string;
}

function getName<T extends Person>(p: T): string {
  return p.name;
}

// Generic classes
interface Song {
  title: string;
  artist: string;
}
interface Video {
  title: string;
  creator: string;
}

class Playlist<T> {
  public queue: T[] = [];
  add(el: T) {
    this.queue.push(el);
  }
}

const songs = new Playlist<Song>();
songs.add({
  title: 'i really want to stay at your house',
  artist: 'Rosa Walton & Hallie Coggins',
});
