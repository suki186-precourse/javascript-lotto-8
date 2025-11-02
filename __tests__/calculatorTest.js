import { PRIZE } from "../src/constants/lotto";
import {
  calculateRank,
  calculateReturnRate,
  calculateTotalMoney,
} from "../src/utils/calculator";

describe("calculator.js 계산 함수 테스트", () => {
  // ===== calculateRank (등수 판별)
  describe("calculateRank", () => {
    const rankCases = [
      [6, false, "FIRST"], // 1등
      [6, true, "FIRST"], // 1등
      [5, true, "SECOND"], // 2등
      [5, false, "THIRD"], // 3등
      [4, true, "FOURTH"], // 4등
      [4, false, "FOURTH"], // 4등
      [3, true, "FIFTH"], // 5등
      [3, false, "FIFTH"], // 5등
      [2, true, null], // 이하 꽝
      [1, false, null],
      [0, false, null],
    ];

    test.each(rankCases)(
      "일치 개수, 보너스 일치 여부 -> 등수",
      (matchCount, hasBonus, expectedRank) => {
        expect(calculateRank(matchCount, hasBonus)).toBe(expectedRank);
      }
    );
  });

  // ===== calculateTotalMoney (총 당첨금 계산)
  describe("calculateTotalMoney", () => {
    test("당첨 내역이 없으면 0원을 반환한다.", () => {
      const ranks = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0 };
      expect(calculateTotalMoney(ranks)).toBe(0);
    });

    test("5등 1개, 3등 1개 당첨: 총 당첨금을 정확히 계산한다.", () => {
      const ranks = { FIRST: 0, SECOND: 0, THIRD: 1, FOURTH: 0, FIFTH: 1 };
      const expectedMoney = PRIZE.THIRD + PRIZE.FIFTH;
      expect(calculateTotalMoney(ranks)).toBe(expectedMoney);
    });
  });

  // ===== calculateReturnRate (수익률 계산)
  describe("calculateReturnRate", () => {
    const rateCases = [
      [5000, 8000, "62.5"],
      [0, 8000, "0.0"],
      [8000, 8000, "100.0"],
      [16000, 8000, "200.0"],
    ];

    test.each(rateCases)(
      "당첨금, 구입액 -> 수익률",
      (totalMoney, purchaseAmount, expectedRate) => {
        expect(calculateReturnRate(totalMoney, purchaseAmount)).toBe(
          expectedRate
        );
      }
    );
  });
});
