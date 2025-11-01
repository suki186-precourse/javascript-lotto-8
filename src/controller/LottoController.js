import LottoGame from "../domain/LottoGame.js";
import { InputView } from "../view/InputView.js";
import { OutputView } from "../view/OutputView.js";

class LottoController {
  #lottoGame; // LottoGame 인스턴스

  async play() {
    // ===== 1. 로또 구매 금액 처리
    // 1,000원 단위 입력 받기
    const purchaseAmount = await InputView.readPurchaseAmount();

    // 발행 수량 계산 (LottoGame 생성)
    this.#lottoGame = new LottoGame(purchaseAmount);

    // 발행 수량 출력
    const lottoCount = this.#lottoGame.getLottoCount();
    OutputView.printLottoCount(lottoCount);

    // ===== 2. 로또 발행
    // 로또 배열 생성
    this.#lottoGame.createLottos();
    const lottos = this.#lottoGame.getLottos();

    // 로또 배열 출력
    OutputView.printLottoList(lottos);
  }
}

export default LottoController;
