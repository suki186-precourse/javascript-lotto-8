import { LOTTO } from "../constants.js";
import { calculateRank, calculateReturnRate, calculateTotalPrize, compareLotto, createLottoNumbers } from "../utils/lottoUtils.js";
import Lotto from "./Lotto.js";

class LottoGame {
    #lottos; // 로또 배열(구입 개수만큼)
    #sumMoney; // 구입 금액
    #lottoCount; // 구입 개수
    #winningNumbers; // 당첨 번호
    #bonusNumbers; // 보너스 번호

    constructor(sumMoney) {
        this.#sumMoney = Number(sumMoney);
        this.#lottoCount = this.#calculateLottoCount(this.#sumMoney);
        this.#lottos = [];
    }

    // 구입 금액 -> 개수 계산
    #calculateLottoCount(sumMoney) {
        return sumMoney / LOTTO.PRICE;
    }

    // Lotto 객체 배열 생성
    createLottos() {
        for (let i=0; i<this.#lottoCount; i++) {
            const numbers = createLottoNumbers();
            const lotto = new Lotto(numbers);

            this.#lottos.push(lotto); // 배열에 저장
        }
    }

    // 당첨, 보너스 번호 저장
    setWinningNumbers(winningNumbers, bonusNumber) {
        this.#winningNumbers = winningNumbers;
        this.#bonusNumbers = bonusNumber;
    }

    // 당첨 비교 및 개수 카운트
    drawResult() {
        // 등수별 당첨 횟수
        const rankCounts = {
            FIRST: 0,
            SECOND: 0,
            THIRD: 0,
            FOURTH: 0,
            FIFTH: 0,
        }

        // 로또와 당첨 번호 비교(forEach)
        this.#lottos.forEach((lotto) => {
            // 일치 개수  계산
            const {matchedCount, hasBonus} = compareLotto(lotto, this.#winningNumbers, this.#bonusNumbers);
            
            // 등수 계산 및 카운트
            const rank = calculateRank(matchedCount, hasBonus);
            if (rank) {
                rankCounts[rank] += 1;
            }
        })

        return rankCounts;
    }

    // 총 상금 계산
    drawTotalPrize(rankCounts) {
        const totalPrize = calculateTotalPrize(rankCounts);

        return totalPrize;
    }

    // 수익률 계산
    drawReturnRate(totalPrize) {
        const returnRate = calculateReturnRate(totalPrize, this.#sumMoney);
        return returnRate;
    }

    // getter
    get lottos() {
        return this.#lottos;
    }

    get lottoCount() {
        return this.#lottoCount;
    }
}
export default LottoGame;