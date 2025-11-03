import { createLottoNumbers, compareLotto } from "../src/utils/lottoUtils.js";
import { Random } from "@woowacourse/mission-utils";
import { LOTTO } from "../src/constants/lotto.js";

jest.mock("@woowacourse/mission-utils", () => ({
  Random: {
    pickUniqueNumbersInRange: jest.fn(), // pickUniqueNumbersInRange만 mock 함수로
  },
}));

describe("lottoUtils.js 유틸 함수 테스트", () => {
  // 각 테스트가 끝나면 mock 함수 기록 초기화
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===== createLottoNumbers (랜덤 번호 생성)
  describe("createLottoNumbers", () => {
    test("Random.pickUniqueNumbersInRange가 (1, 45, 6)로 호출된다.", () => {
      const mockReturn = [1, 2, 3, 4, 5, 6];
      Random.pickUniqueNumbersInRange.mockReturnValue(mockReturn);

      const numbers = createLottoNumbers();

      expect(Random.pickUniqueNumbersInRange).toHaveBeenCalledWith(
        LOTTO.MIN_NUMBER,
        LOTTO.MAX_NUMBER,
        LOTTO.NUMBER_COUNT
      );

      expect(numbers).toBe(mockReturn);
    });
  });

  // ===== compareLotto (로또 번호 비교)
  describe("compareLotto", () => {
    const createMockLotto = (numbers) => ({
      getNumbers: () => numbers,
    });

    // 고정 당첨/보너스 번호
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const comparisonCases = [
      [[1, 2, 3, 4, 5, 6], { matchCount: 6, hasBonus: false }], // 1등
      [[1, 2, 3, 4, 5, 7], { matchCount: 5, hasBonus: true }], // 2등
      [[1, 2, 3, 4, 5, 8], { matchCount: 5, hasBonus: false }], // 3등
      [[1, 2, 3, 4, 8, 9], { matchCount: 4, hasBonus: false }], // 4등
      [[1, 2, 3, 8, 9, 10], { matchCount: 3, hasBonus: false }], // 5등
      [[10, 11, 12, 13, 14, 15], { matchCount: 0, hasBonus: false }], // 꽝
    ];

    test.each(comparisonCases)(
      "로또 번호로 일치하는 번호 개수, 보너수 일치 여부를 반환한다.",
      (lottoNumbers, expectedResult) => {
        const lotto = createMockLotto(lottoNumbers);
        const result = compareLotto(lotto, winningNumbers, bonusNumber);

        expect(result).toEqual(expectedResult);
      }
    );
  });
});
