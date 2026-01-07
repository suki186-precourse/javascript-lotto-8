import LottoGame from "../domain/LottoGame.js";
import { InputView } from "../view/InputView.js";
import { OutputView } from "../view/OutputView.js";
import { Validator } from "../view/Validator.js";


export class LottoController {
  #lottoGame;

  async run() {
        // 구입 금액 입력
        await this.#handleInput(async() => {
            const sumMoney = await InputView.readSumMoney();
            this.#lottoGame = new LottoGame(sumMoney);
        })

        // 나의 로또 목록
        this.#printMyLottos();

        // 당첨 번호 입력
        const winningNumbers = await this.#readWinningNumbers();

        // 보너스 번호 입력
        const bonusNumber = await this.#readBonusNumber(winningNumbers);

        // lottoGame 데이터 저장
        this.#lottoGame.setWinningNumbers(winningNumbers, bonusNumber);
        
        // 당첨 통계 계산 및 출력
        this.#printResult();
  }

  // 재입력 로직
  async #handleInput(inputAction) {
    while (true) {
      try {
        return await inputAction();
        break;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  async #readWinningNumbers() {
    return await this.#handleInput(async () => {
        return await InputView.readWinningNumbers();
    });
  }

  async #readBonusNumber(winningNumbers) {
    return await this.#handleInput(async () => {
        const bonusNumber = await InputView.readBonusNumber();
        // 당첨 번호와 중복 검사
        Validator.validateBonusDuplicate(winningNumbers, bonusNumber);

        return bonusNumber;
    });
  }

  #printMyLottos() {
    const count = this.#lottoGame.lottoCount;
    OutputView.printLottoCount(count)

    this.#lottoGame.createLottos();

    const lottos = this.#lottoGame.lottos;
    OutputView.printMyLottos(lottos);
  }

  #printResult() {
    const result = this.#lottoGame.drawResult();
    OutputView.printLottoResult(result);

    const totalPrize = this.#lottoGame.drawTotalPrize(result);
    const returnRate = this.#lottoGame.drawReturnRate(totalPrize);
    OutputView.printReturnRate(returnRate);
  }
}
