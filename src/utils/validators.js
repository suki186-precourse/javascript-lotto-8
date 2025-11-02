import { LOTTO } from "../constants/lotto.js";
import { ERROR, ERROR_MESSAGES } from "../constants/message.js";

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
