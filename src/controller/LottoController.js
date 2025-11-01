import LottoGame from "../domain/LottoGame.js";
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
  }

  // 단위 입력, 수량 계산, 수량 출력
  async #handlePurchase() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    this.#lottoGame = new LottoGame(purchaseAmount);

    const lottoCount = this.#lottoGame.getLottoCount();
    OutputView.printTicketCount(lottoCount);
  }

  // 로또 배열 생성, 출력
  #handleCreateLottos() {
    this.#lottoGame.issueLottos();

    const lottos = this.#lottoGame.getLottos();
    OutputView.printTickets(lottos);
  }

  // 당첨/보너스 번호 입력 -> 변환 후 저장
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
}

export default LottoController;
