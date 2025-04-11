import {Random, Console} from "@woowacourse/mission-utils"

function Car(name, movement) { // 객체 생성
  this.name = name;
  this.movement = 0;

  this.move = function () {
    this.movement += 1;
  };
}

class App {
    async play() {
    const name =  await this.readCarNames();
    const cars = name.map(name => new Car(name)); // cars 객체 생성

    const playtime = await this.readPlayCount();

    Console.print("\n실행 결과");
    await this.startRace(cars, playtime);

  }

  async readCarNames() {  // 자동차 이름 입력받는 함수
    const input = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n");
    
    if (!input) {
      throw new Error("[ERROR] 입력되지 않았습니다.");
    } 
    
    const name = input.split(",");    // name 배열 만들기
    const check = new Set(name);

    if (name.some(name => name.length > 5)) { // 5자 초과
      throw new Error("[ERROR] 이름이 5자를 초과합니다.");
    } else if (name.some(name => name.length === 0)) {  // 이름 중에 ,, 입력
      throw new Error("[ERROR] 이름이 입력되지 않은 자동차가 있습니다.");
    } else if (check.size !== name.length) { // 이름 중복인 경우
      throw new Error("[ERROR] 이름이 중복되는 자동차가 있습니다.");
    }

    return name;
  }

  async readPlayCount() { // 시도 횟수 입력받는 함수
    const playtime = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");

    if (!playtime) {
      throw new Error("[ERROR] 입력되지 않았습니다.");
    } else if (isNaN(playtime)) {
      throw new Error("[ERROR] 숫자를 입력하셔야 합니다.");
    } 

    return playtime;
  }

  async startRace(cars, playtime) {  // 경주 함수
    while (playtime --) { 
      cars.forEach(car => {
        const random = Random.pickNumberInRange(0, 9);
        if (random >= 4) 
          car.move();
      })
      await this.printRaceStatus(cars);
    }
    this.printWinners(cars);
  }

  async printRaceStatus(cars) {
    cars.forEach(car => {
      const line = "-".repeat(car.movement);
      Console.print(`${car.name} : ${line}`);
    });

    Console.print("");
  }

  printWinners(cars) {
    const maxMovement = Math.max(...cars.map(car => car.movement)); // 가장 먼 거리 구하기
    const winners = cars
      .filter(car => car.movement === maxMovement)
      .map(car => car.name);

    Console.print(`최종 우승자 : ${winners.join(", ")}`);
  }
}

export default App;