import { Console, Random } from "@woowacourse/mission-utils";

class App {
  async play() {

    const getCarNames = async () => {
      const input = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분");
      const names = input.split(",").map((name) => name.trim());
  
      if (names.length === 0 || names.length > 5) {
        throw new Error("[ERROR] 경주차는 1개에서 5개 사이여야 합니다.");
      }
  
      const isInvalidName = names.some((name) => name === "" || name.length > 5);
      if (isInvalidName) {
        throw new Error("[ERROR] 자동차 이름은 5자 이하여야 하며 공백이 없어야 합니다.");
      }
  
      return names;
    }
  
    // 자동차 이름 입력받는 함수


//시도횟수 받는 함수
    const getTryCount = async () => {
      const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요?");
      const tryCount = Number(input);
  
      if (isNaN(tryCount) || tryCount <= 0) {
        throw new Error("[ERROR] 잘못된 숫자 입력입니다.");
      }
  
      return tryCount;
    }
    

    const runRace = (carNames, tryCount) => {
      const raceCondition = Array(carNames.length).fill("");

      Console.print("실행 결과");

      // 각 라운드 구현/ 0~9 랜덤수가 4이상일 시 전진진
      for (let round = 0; round < tryCount; round++) {
        for (let j = 0; j < carNames.length; j++) {
          const randomNumber = Random.pickNumberInRange(0, 9);
          if (randomNumber >= 4) {
            raceCondition[j] += "-";
          }
        }

        carNames.forEach((name, idx) => {
          Console.print(`${name} : ${raceCondition[idx]}`);
        });
      }

      return raceCondition;
    };



    //승자 조건 정리
    const printWinners = (carNames, raceCondition) => {
      const max = Math.max(...raceCondition.map((r) => r.length));
      const winners = carNames.filter((_, idx) => raceCondition[idx].length === max);
      Console.print(`Final Winner: ${winners.join(", ")}`);
    };

    //실행
    try {
      const carNames = await getCarNames();
      const tryCount = await getTryCount();
      const raceCondition = runRace(carNames, tryCount);
      printWinners(carNames, raceCondition);
    } catch (error) {
      Console.print(error.message);
      throw error; // 추가됨
    }
  }
}


export default App;
