import { LOTTO } from "../constants/lotto.js";

class LottoGame {
  #lottoCount; // 발행 수량
  #lottos; // 발행된 로또 목록

  constructor(purchaseAmount) {
    this.#lottoCount = this.#calculateLottoCount(Number(purchaseAmount));
    this.#lottos = [];
  }

  // 구입 금액 -> 로또 수량 계산
  #calculateLottoCount(purchaseAmount) {
    return purchaseAmount / LOTTO.PRICE;
  }

  // 로또 수량 return
  getLottoCount() {
    return this.#lottoCount;
  }
}

export default LottoGame;
