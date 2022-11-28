// Annotating Classes
class Player {
  // 타입 지정하지 않은 프로퍼티는 사용 불가
  // public / private 접근 제어자, readonly 사용 가능
  public readonly firstName: string;
  public readonly lastName: string;
  private score: number = 0; // Class field 문법으로 타입 추론
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const elton = new Player('DongHun', 'Kim');
const kawai = new Player('Joohyun', 'Choi');

console.log(`${kawai} love ${elton}`);
