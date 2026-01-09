import LottoGame from "../domain/LottoGame.js";
import { InputView } from "../view/InputView.js";
import { OutputView } from "../view/OutputView.js";
import { Validator } from "../view/Validator.js";

export class LottoController {
  async run() {
    // 구입 금액 입력 및 객체 생성
    const lottoGame = await this.#handleInput(() => this.#purchaseLotto());

    // 당첨 및 보너스 번호 입력
    await this.#handleInput(() => this.#settingNumbers(lottoGame));

    // 결과 계산 및 출력
    this.#displayResult(lottoGame);
  }

  async #purchaseLotto() {
    const sumMoney = await InputView.readSumMoney();
    const game = new LottoGame(sumMoney);

    // 로또 생성 및 출력
    game.createLottos();

    OutputView.printLottoCount(game.lottoCount);
    OutputView.printMyLottos(game.lottos);

    return game;
  }

  async #settingNumbers(lottoGame) {
    const winningNumbers = await InputView.readWinningNumbers();
    const bonusNumber = await InputView.readBonusNumber();
    Validator.validateBonusDuplicate(winningNumbers, bonusNumber);

    lottoGame.setWinningNumbers(winningNumbers, bonusNumber);
  }

  #displayResult(lottoGame) {
    const result = lottoGame.drawResult();
    OutputView.printLottoResult(result);

    const totalPrize = lottoGame.drawTotalPrize(result);
    const returnRate = lottoGame.drawReturnRate(totalPrize);
    OutputView.printReturnRate(returnRate);
  }

  // 재입력 로직
  async #handleInput(inputAction) {
    while (true) {
      try {
        return await inputAction();
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }
}
