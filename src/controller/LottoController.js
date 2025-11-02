import LottoGame from "../domain/LottoGame.js";
import {
  calculateReturnRate,
  calculateTotalMoney,
} from "../utils/calculator.js";
import { parseBonusNumber, parseWinningNumbers } from "../utils/parser.js";
import {
  validatePurchaseAmount,
  validateWinningNumbers,
} from "../utils/validators.js";
import { InputView } from "../view/InputView.js";
import { OutputView } from "../view/OutputView.js";

class LottoController {
  #lottoGame; // LottoGame 인스턴스

  async play() {
    // ===== 1. 로또 구매 금액 처리
    await this.#handlePurchase();

    // ===== 2. 로또 발행
    this.#handleCreateLottos();

    // ===== 3. 당첨 번호 처리
    await this.#handleWinningInfo();

    // ===== 4, 5 당첨 판별 및 통계 결과, 수익률 출력
    this.#handleResult();
  }

  // 1. 단위 입력, 수량 계산, 수량 출력
  async #handlePurchase() {
    while (true) {
      const purchaseAmount = await InputView.readPurchaseAmount();

      try {
        validatePurchaseAmount(purchaseAmount); // 유효성 검증

        this.#lottoGame = new LottoGame(purchaseAmount);

        const lottoCount = this.#lottoGame.getLottoCount();
        OutputView.printLottoCount(lottoCount);

        break;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  // 2. 로또 배열 생성, 출력
  #handleCreateLottos() {
    this.#lottoGame.createLottos();

    const lottos = this.#lottoGame.getLottos();
    OutputView.printLottoList(lottos);
  }

  // 3. 당첨/보너스 번호 입력 -> 변환 후 저장
  async #handleWinningInfo() {
    const winningNumbers = await this.#getWinningNumbers();
    const bonusNumber = await this.#getBonusNumber();

    this.#lottoGame.setWinningInfo(winningNumbers, bonusNumber);
  }

  // 당첨 번호 변환 (string -> number[])
  async #getWinningNumbers() {
    while (true) {
      const winningNumbersInput = await InputView.readWinningNumbers();

      try {
        validateWinningNumbers(winningNumbersInput); // 유효성 검증

        return parseWinningNumbers(winningNumbersInput);
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  // 보너스 번호 (string -> number)
  async #getBonusNumber() {
    const bonusNumberInput = await InputView.readBonusNumber();

    return parseBonusNumber(bonusNumberInput);
  }

  // 4, 5. 번호 비교, 등수 카운트
  #handleResult() {
    const rankCounts = this.#lottoGame.calculateResults();
    const totalMoney = calculateTotalMoney(rankCounts); // 총 당첨 금액

    const purchaseAmount = this.#lottoGame.getPurchaseAmount();
    const returnRate = calculateReturnRate(totalMoney, purchaseAmount); // 수익률

    this.#printResult(rankCounts, returnRate);
  }

  // 통계, 수익률 출력
  #printResult(rankCounts, returnRate) {
    OutputView.printStatistics(rankCounts);
    OutputView.printReturnRate(returnRate);
  }
}

export default LottoController;
