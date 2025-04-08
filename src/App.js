import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async play() {
    // 입력1 : car 이름
    let carName = await Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'); // carName = 자동차 이름 Array
    carName = carName.split(',');
    const carProgress = new Array(carName.length).fill(0); // carProgress = 자동차 진척도 배열(순서는 carName과 같음)
    // 입력 확인 : carName이 5자 이하
    for (let i=0;i<carName.length;i++) {
      if (carName[i].length > 5) {
        throw new Error("[ERROR]");
      }
    }

    // 입력2 : 실행 횟수
    let tryCount = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n'); // tryCount = 시도횟수
    Console.print(''); // 한줄 띄우기
    // 입력 확인 : tryCount가 양의 정수인지
    if (tryCount > 0) {} // tryCount가 0이하이면 에러 출력
    else {throw new Error("[ERROR]")}
    
    // 진행
    Console.print('실행 결과');
    while (tryCount>0) { // tryCount가 0이 될때까지
      for (let i=0;i<carName.length;i++) { // 'car 개수'번 반복
        if (Random.pickNumberInRange(0,9)>=4) {
          carProgress[i]++;
        }
        const temp = '-'.repeat(carProgress[i])
        Console.print(`${carName[i]} : ${temp}`);
      }
      Console.print(''); // 한줄 띄우는 용도
      tryCount--;
    }

    // 승자 판단
    let maxCount = 0;
    let winner = [];
    for (let i=0;i<carName.length;i++) {
      if (carProgress[i]>=maxCount) {
        if (carProgress[i]!=maxCount) {winner = []}
        winner.push(carName[i]);
        maxCount=carProgress[i];
      }
    }
    Console.print(`최종 우승자 : ${winner}`);
  }
}

export default App;
