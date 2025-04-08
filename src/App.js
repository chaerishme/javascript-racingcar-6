import { Console, Random } from '@woowacourse/mission-utils';

/**
 * 정현민 App클래스
 * inputCar() : 자동차 이름을 입력받습니다.
 * inputTryNumber() : 시도횟수를 입력받습니다.
 * playGameAndPrintMovement(CAR, TRY_NUM) : 게임을 실행하고 자동차 움직임을 출력합니다.
 * showWinner(GAME_RESULT, CAR) : 최종 우승자를 출력합니다.
 * showErrorMessage(e) : 입력문 종류에 따라 에러문을 출력하고 프로그램을 종료합니다. 
 */
class App {

  async play() {
    const CAR = await this.inputCar();
    const TRY_NUM = await this.inputTryNumber();
    const GAME_RESULT = this.playGameAndPrintMovement(CAR, TRY_NUM);
    this.showWinner(GAME_RESULT, CAR);
  }

/**
 * 사용자로부터 자동차 이름 입력받는 함수
 * @param
 *   none
 * @returns
 *   자동차 이름 문자열 배열
 * @exception
 *   이름의 글자수가 5를 초과할 경우 Error출력 및 프로그램 종료
 *   
 */
  async inputCar(){
    const INPUT = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n");
    const CAR = INPUT.split(',').map(INPUT=>INPUT.trim());

    CAR.forEach(element => {
        if(element.length>5) { this.showErrorMessage(-1); }
    });

    return CAR;
  }


  /**
   * 사용자로부터 시도횟수 입력받는 함수
   * @param
   *   none
   * @returns
   *   시도 횟수 
   * @exception
   *   
   */
  async inputTryNumber(){
    const TRY_NUM = await Console.readLineAsync("시도할 횟수는 몇회인가요?\n");

    if(!Number.isInteger(Number(TRY_NUM)) || !(TRY_NUM>0))
        this.showErrorMessage(-2);

    return TRY_NUM;
  }


  /**
   * 게임을 시작해 전진여부를 계산하고 전진결과를 출력하는 함수
   * @param CAR
   *   자동차 이름 문자열 배열 
   * @param TRY_NUM
   *   시도 횟수
   * @returns
   *   각 자동차의 전진결과가 저장된 숫자배열
   */
  playGameAndPrintMovement(CAR, TRY_NUM){
    const GAME_RESULT = new Array(CAR.length).fill(0);
    Console.print("");

    for(let i=0;i<TRY_NUM;i++){

        //각 자동차마다 전진여부 정하고 출력
        CAR.forEach((carname, index) => {
            if(Random.pickNumberInRange(1,9)>=4){
                GAME_RESULT[index]++;
            }
            let dash = '-'.repeat(GAME_RESULT[index]);
            let output = `${carname} : ${dash}`;
            Console.print(output);
        })

        Console.print("");
    }

    return GAME_RESULT;
  }

  /**
   * 전진결과와 자동차 이름을 입력받아 우승자를 출력하는 함수
   * @param {*} GAME_RESULT 
   *   전진결과 문자배열
   * @param {*} CAR 
   *   자동차 이름 배열
   */
  showWinner(GAME_RESULT, CAR){
    const MAX = Math.max(...GAME_RESULT);
    let output = "최종 우승자 : "

    GAME_RESULT.forEach((value, index)=>{
        if(value ==MAX){
            output += `${CAR[index]} `;
        }
    });
        
    
    Console.print(output);
  }

  /**
   * 에러종류 전달받아 에러메시지 출력하고 프로그램 종료시키는 함수
   * @param {*} e 
   *   에러종류를 나타내는 숫자
   *   -1 : 자동차 이름 입력 중 에러
   *   -2 : 시도횟수 입력 중 에러
   */
  showErrorMessage(e){
    if(e===-1)
        throw new Error("[ERROR] : 이름의 최대 글자수는 5 입니다.");
    else if(e===-2)
        throw new Error("[ERROR] : 숫자가 잘못된 형식입니다.");
  }
}

export default App;
