import { Random } from "@woowacourse/mission-utils";
import { LOTTO, PRIZE } from "../constants.js";

// 로또 배열 생성
export const createLottoNumbers = () => {
    return Random.pickUniqueNumbersInRange(LOTTO.MIN, LOTTO.MAX, LOTTO.COUNT);
}

// 당첨, 보너스 번호와 비교 및 카운드
export const compareLotto = (lotto, winningNumbers, bonusNumber) => {
    const lottoOne = lotto.numbers;

    // 일치하는 개수
    const matchedCount = lottoOne.filter(n => winningNumbers.includes(n)).length;

    // 보너스번호 일치
    const hasBonus = lottoOne.includes(bonusNumber); // T/F

    return {matchedCount, hasBonus};
}

// 등수 계산 로직
export const calculateRank = (matchedCount, hasBonus) => {
    if (matchedCount === 6) {
        return 'FIRST';
    }
    if (matchedCount === 5 && hasBonus) {
        return 'SECOND';
    }
    if (matchedCount === 5 && !hasBonus) {
        return 'THIRD';
    }
    if (matchedCount === 4) {
        return 'FOURTH';
    }
    if (matchedCount === 3) {
        return 'FIFTH';
    }
    return null;
}

// 수익률 계산
export const calculateReturnRate = (totalPrize, sumMoney) => {
    const returnRate =  (totalPrize / sumMoney) * 100;
    return returnRate.toFixed(1);
}

// 총 상금 계산
export const calculateTotalPrize = (rankCount) => {
    let sum = 0;

    sum += rankCount.FIRST * PRIZE.FIRST;
    sum += rankCount.SECOND * PRIZE.SECOND;
    sum += rankCount.THIRD * PRIZE.THIRD;
    sum += rankCount.FOURTH * PRIZE.FOURTH;
    sum += rankCount.FIFTH * PRIZE.FIFTH;

    return sum;
}