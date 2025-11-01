import { LOTTO } from "../constants/lotto.js";
import { createLottoNumbers } from "../utils/lottoUtils.js";
import Lotto from "./Lotto.js";

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

  // 로또 수량만큼 로또 생성 -> lottos에 저장
  createLottos() {
    for (let i = 0; i < this.#lottoCount; i++) {
      const numbers = createLottoNumbers();
      const lotto = new Lotto(numbers);

      this.#lottos.push(lotto);
    }
  }

  // 로또 목록 return
  getLottos() {
    return this.#lottos;
  }
}

export default LottoGame;
