import { LOTTO } from "../constants/lotto.js";
import { COMMON, ERROR, ERROR_MESSAGES } from "../constants/message.js";

// 에러메세지 형식
const errorMessage = (message) => {
  throw new Error(`${ERROR} ${message}`);
};

// ===== 1. 로또 구입 금액 유효성 검증
// 정수가 아닌 값을 입력한 경우(공백, 문자, 소수)
const validateIsInteger = (input) => {
  if (
    input.trim() === "" ||
    isNaN(Number(input)) ||
    !Number.isInteger(Number(input))
  ) {
    errorMessage(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT);
  }
};

// 1,000원 미만의 값을 입력한 경우
const validateMinAmount = (input) => {
  if (input < LOTTO.PRICE) {
    errorMessage(ERROR_MESSAGES.UNDER_MIN_PURCHASE_AMOUNT);
  }
};

// 1,000원 단위가 아닌 경우
const validateAmountUnit = (input) => {
  if (input % LOTTO.PRICE !== 0) {
    errorMessage(ERROR_MESSAGES.PURCHASE_AMOUNT_UNIT);
  }
};

export const validatePurchaseAmount = (purchaseAmount) => {
  validateIsInteger(purchaseAmount);

  const amountNumber = Number(purchaseAmount);

  validateMinAmount(amountNumber);
  validateAmountUnit(amountNumber);
};

// ===== 2. 당첨 번호 유효성 검증
// 공백/빈 값, 쉼표(,) 외 다른 구분자, 정수 아님 체크
const validateWinningNumbersFormat = (input) => {
  if (input.trim() === "") {
    errorMessage(ERROR_MESSAGES.EMPTY_WINNING_NUMBERS);
  }

  if (
    COMMON.INVALID_NUMBER_REGEX.test(input) ||
    input.includes(",,") ||
    input.endsWith(",")
  ) {
    errorMessage(ERROR_MESSAGES.INVALID_WINNING_NUMBERS);
  }
};

// 개수 오류, 범위 초과, 중복 체크
const validateWinningNumbersEach = (input) => {
  if (input.length !== LOTTO.NUMBER_COUNT) {
    errorMessage(ERROR_MESSAGES.INVALID_NUMBER_COUNT);
  }

  if (input.some((n) => n < LOTTO.MIN_NUMBER || n > LOTTO.MAX_NUMBER)) {
    errorMessage(ERROR_MESSAGES.INVALID_NUMBER_RANGE);
  }

  const uniqueNumbers = new Set(input);
  if (uniqueNumbers.size !== input.length) {
    errorMessage(ERROR_MESSAGES.DUPLICATE_NUMBERS);
  }
};

export const validateWinningNumbers = (winningNumbers) => {
  validateWinningNumbersFormat(winningNumbers);

  const numbers = winningNumbers.split(",").map(Number);
  validateWinningNumbersEach(numbers);
};

// ===== 3. 보너스 번호 유효성 검증
// 공백/빈 값, 정수 아님 체크
const validateBonusNumberFormat = (input) => {
  if (input.trim() === "") {
    errorMessage(ERROR_MESSAGES.EMPTY_BONUS_NUMBER);
  }

  if (COMMON.INVALID_NUMBER_REGEX.test(input)) {
    errorMessage(ERROR_MESSAGES.INVALID_BONUS_COUNT);
  }
};

// 범위 초과, 중복 체크
const validateBonusNumberEach = (input, winningNumbers) => {
  if (input < LOTTO.MIN_NUMBER || input > LOTTO.MAX_NUMBER) {
    errorMessage(ERROR_MESSAGES.INVALID_BONUS_RANGE);
  }

  if (winningNumbers.includes(input)) {
    errorMessage(ERROR_MESSAGES.DUPLICATE_BONUS);
  }
};

export const validateBonusNumber = (bonusNumber, winningNumbers) => {
  validateBonusNumberFormat(bonusNumber);

  const number = Number(bonusNumber);
  validateBonusNumberEach(number, winningNumbers);
};
