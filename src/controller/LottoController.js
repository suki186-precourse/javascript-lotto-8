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
}

export default LottoController;
