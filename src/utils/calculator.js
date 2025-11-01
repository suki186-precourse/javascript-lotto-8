import { PRIZE } from "../constants/lotto.js";

// 일치하는 번호의 개수에 따른 등수 판별
export const calculateRank = (matchCount, hasBonus) => {
  if (matchCount === 6) {
    return "FIRST";
  }
  if (matchCount === 5 && hasBonus) {
    return "SECOND";
  }
  if (matchCount === 5 && !hasBonus) {
    return "THIRD";
  }
  if (matchCount === 4) {
    return "FOURTH";
  }
  if (matchCount === 3) {
    return "FIFTH";
  }
  return null; // 2개 이하
};

// 총 당첨 금액 계산
export const calculateTotalMoney = (rankCounts) => {
  let totalMoney = 0;
  totalMoney += rankCounts.FIRST * PRIZE.FIRST;
  totalMoney += rankCounts.SECOND * PRIZE.SECOND;
  totalMoney += rankCounts.THIRD * PRIZE.THIRD;
  totalMoney += rankCounts.FOURTH * PRIZE.FOURTH;
  totalMoney += rankCounts.FIFTH * PRIZE.FIFTH;
  return totalMoney;
};

// 수익률 계산
export const calculateReturnRate = (totalMoney, purchaseAmount) => {
  const rate = (totalMoney / purchaseAmount) * 100;

  // 소수점 둘째 자리에서 반올림(무조건 첫째자리까지)
  return rate.toFixed(1);
};
