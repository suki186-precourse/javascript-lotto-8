import {
  validatePurchaseAmount,
  validateWinningNumbers,
  validateBonusNumber,
} from "../src/utils/validators.js";
import { ERROR, ERROR_MESSAGES } from "../src/constants/message.js";

const errorMessage = (message) => `${ERROR} ${message}`;

describe("validators.js 유효성 검증 테스트", () => {
  // ===== 구입 금액 유효성 검증
  describe("validatePurchaseAmount", () => {
    // 성공 케이스
    test("유효한 구입 금액은 예외가 발생하지 않는다.", () => {
      expect(() => validatePurchaseAmount("1000")).not.toThrow();
      expect(() => validatePurchaseAmount("3000")).not.toThrow();
    });

    // 실패 케이스
    const invalidAmountCases = [
      ["", errorMessage(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT)], // 빈 값
      [" ", errorMessage(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT)], // 공백
      ["ab", errorMessage(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT)], // 문자
      ["1000.5", errorMessage(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT)], // 소수
      ["500", errorMessage(ERROR_MESSAGES.UNDER_MIN_PURCHASE_AMOUNT)], // 1000원 미만
      ["1500", errorMessage(ERROR_MESSAGES.PURCHASE_AMOUNT_UNIT)], // 1000원 단위 아님
    ];

    test.each(invalidAmountCases)(
      "유효하지 않은 구입 금액은 예외가 발생한다.",
      (input, expectedError) => {
        expect(() => validatePurchaseAmount(input)).toThrow(expectedError);
      }
    );
  });

  // ===== 당첨 번호 유효성 검증
  describe("validateWinningNumbers", () => {
    // 성공 케이스
    test("유효한 당첨 번호는 예외가 발생하지 않는다.", () => {
      expect(() => validateWinningNumbers("1,2,3,4,5,6")).not.toThrow();
    });

    // 실패 케이스
    const invalidWinningCases = [
      ["", errorMessage(ERROR_MESSAGES.EMPTY_WINNING_NUMBERS)], // 빈 값
      ["1,2,3", errorMessage(ERROR_MESSAGES.INVALID_NUMBER_COUNT)], // 6개 아님
      ["1,2,3,4,5,ab", errorMessage(ERROR_MESSAGES.INVALID_WINNING_NUMBERS)], // 문자 포함
      ["1,2,3,4,5, 1", errorMessage(ERROR_MESSAGES.INVALID_WINNING_NUMBERS)], // 공백 포함
      ["1,2,,4,5,6", errorMessage(ERROR_MESSAGES.INVALID_WINNING_NUMBERS)], // 이중 쉼표
      ["1,2,3,4,5,6,", errorMessage(ERROR_MESSAGES.INVALID_WINNING_NUMBERS)], // 끝 쉼표
      ["1,2,3,4,5,46", errorMessage(ERROR_MESSAGES.INVALID_NUMBER_RANGE)], // 범위 초과
      ["0,1,2,3,4,5", errorMessage(ERROR_MESSAGES.INVALID_NUMBER_RANGE)], // 범위 미만
      ["1,2,3,4,5,5", errorMessage(ERROR_MESSAGES.DUPLICATE_NUMBERS)], // 중복
    ];

    test.each(invalidWinningCases)(
      "유효하지 않은 당첨 번호는 예외가 발생한다.",
      (input, expectedError) => {
        expect(() => validateWinningNumbers(input)).toThrow(expectedError);
      }
    );
  });

  // ===== 보너스 번호 유효성 검증
  describe("validateBonusNumber", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6]; // 고정 당첨 번호

    // 성공 케이스
    test("유효한 보너스 번호는 예외가 발생하지 않는다.", () => {
      expect(() => validateBonusNumber("7", winningNumbers)).not.toThrow();
    });

    // 실패 케이스
    const invalidBonusCases = [
      ["", errorMessage(ERROR_MESSAGES.EMPTY_BONUS_NUMBER)], // 빈 값
      [" ", errorMessage(ERROR_MESSAGES.EMPTY_BONUS_NUMBER)], // 공백
      ["ab", errorMessage(ERROR_MESSAGES.INVALID_BONUS_COUNT)], // 문자
      ["1,2", errorMessage(ERROR_MESSAGES.INVALID_BONUS_COUNT)], // 쉼표
      ["7.5", errorMessage(ERROR_MESSAGES.INVALID_BONUS_COUNT)], // 소수
      ["0", errorMessage(ERROR_MESSAGES.INVALID_BONUS_RANGE)], // 범위 미만
      ["46", errorMessage(ERROR_MESSAGES.INVALID_BONUS_RANGE)], // 범위 초과
      ["6", errorMessage(ERROR_MESSAGES.DUPLICATE_BONUS)], // 당첨 번호와 중복
    ];

    test.each(invalidBonusCases)(
      "유효하지 않은 보너스 번호는 예외가 발생한다.",
      (input, expectedError) => {
        expect(() => validateBonusNumber(input, winningNumbers)).toThrow(
          expectedError
        );
      }
    );
  });
});
