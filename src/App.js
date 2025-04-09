import { Console, Random } from '@woowacourse/mission-utils';

function Car(name, movement) { // 객체 생성
  this.name = name;
  this.movement = 0;

  this.move = function () {
    this.movement += 1;
  };
}

class App {
  async play() {
    const { CarName, Chance } = await this.getInput();

    const CarList = CarName.map(name => new Car(name));//Car객체 생성(선언)
    this.carRacing(CarList, Chance);

    this.consequence(CarList);
  }

  //입력받는 함수, return 값 : 경주 차 이름, 시도횟수
  async getInput() {
    const Input = await Console.readLineAsync("경주할 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n");
    const CarName = Input.split(',');
    for (let i = 0; i < CarName.length; i++) {
      if (CarName[i].length > 5) {
        throw new Error("[ERROR]이름은 5글자 이하여야 합니다.\n");
      }
    }
    const Chance = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");

    if (isNaN(Chance)) {
      throw new Error("[ERROR]숫자를 입력해야 합니다.\n");
    }

    return { CarName, Chance };
  }

  //시도 횟수만큼 반복하는 함수, return X
  carRacing(CarList, Chance) {
    Console.print("실행결과\n");

    for (let i = 0; i < Chance; i++) {
      this.raceProcess(CarList);
    }
  }
  

  //전진 횟수 세고 각 횟수마다 결과 출력하는 함수, return X
  raceProcess(CarList) {
    CarList
      .forEach(car => {
        let number = Random.pickNumberInRange(0,9);
        if (number >= 4) {
          car.move();
        }
        const Line = "-".repeat(car.movement);
        Console.print(`${car.name} : ${Line}\n`);
      })

    Console.print("\n");
  }

  //최종 우승 자동차 출력 함수, return X
  consequence(CarList) {
    let maxCarList = [];
    const Max = Math.max(...CarList.map(car => car.movement));

    CarList
      .forEach(car => {
        if(car.movement === Max) {
          maxCarList.push(car.name);
        }
      });

    Console.print("최종 우승자 : ");
    Console.print(maxCarList.join(", "));
  }
}

export default App;
