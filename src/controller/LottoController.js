import { COMMON } from "../constants/message.js";
import LottoGame from "../domain/LottoGame.js";
import { calculateTotalMoney } from "../utils/calculator.js";
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

    // ===== 4. 당첨 판별 및 출력
    this.#handleResult();
  }

  // 1. 단위 입력, 수량 계산, 수량 출력
  async #handlePurchase() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    this.#lottoGame = new LottoGame(purchaseAmount);

    const lottoCount = this.#lottoGame.getLottoCount();
    OutputView.printLottoCount(lottoCount);
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

  // 당첨 번호 (string -> number[])
  async #getWinningNumbers() {
    const winningNumbersInput = await InputView.readWinningNumbers();

    // 구분자(,) 기준 분리
    const winningNumbers = winningNumbersInput
      .split(COMMON.DELIMITERS)
      .map(Number);

    return winningNumbers;
  }

  // 보너스 번호 (string -> number)
  async #getBonusNumber() {
    const bonusNumberInput = await InputView.readBonusNumber();

    return Number(bonusNumberInput);
  }

  // 4. 번호 비교, 등수 카운트 -> 출력
  #handleResult() {
    const rankCounts = this.#lottoGame.calculateResults();
    const totalMoney = calculateTotalMoney(rankCounts); // 총 당첨 금액

    OutputView.printStatistics(rankCounts);
  }
}

export default LottoController;
