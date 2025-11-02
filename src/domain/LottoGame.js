import { LOTTO } from "../constants/lotto.js";
import { calculateRank } from "../utils/calculator.js";
import { compareLotto, createLottoNumbers } from "../utils/lottoUtils.js";
import Lotto from "./Lotto.js";

class LottoGame {
  #lottoCount; // 발행 수량
  #lottos; // 발행된 로또 목록
  #winningNumbers; // 당첨 번호
  #bonusNumber; // 보너스 번호
  #purchaseAmount; // 구입 금액

  constructor(purchaseAmount) {
    this.#purchaseAmount = Number(purchaseAmount);
    this.#lottoCount = this.#calculateLottoCount(this.#purchaseAmount);
    this.#lottos = [];
  }

  // 구입 금액 -> 로또 수량 계산
  #calculateLottoCount(purchaseAmount) {
    return purchaseAmount / LOTTO.PRICE;
  }

  // 구입 금액 return
  getPurchaseAmount() {
    return this.#purchaseAmount;
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

  // 당첨 번호, 보너스 번호 저장
  setWinningInfo(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  // 당첨 번호 비교(로또 수량만큼) -> 등수별 횟수 카운트
  calculateResults() {
    // 등수별 당첨 횟수
    const rankCounts = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };

    this.#lottos.forEach((lotto) => {
      // 로또와 당첨 번호 비교
      const { matchCount, hasBonus } = compareLotto(
        lotto,
        this.#winningNumbers,
        this.#bonusNumber
      );

      // 등수 계산 및 카운트
      const rank = calculateRank(matchCount, hasBonus);
      if (rank) {
        rankCounts[rank] += 1;
      }
    });

    return rankCounts;
  }
}

export default LottoGame;
