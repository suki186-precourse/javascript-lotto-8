import { ERROR_MESSAGES, LOTTO } from "../constants.js";

export const Validator = {
  // 구입 금액 유효성 검사
  validateSumMoney(input) {
    const sumMoney = input.trim();

    if (sumMoney === "" || /[^0-9]/.test(sumMoney)) {
      throw new Error(ERROR_MESSAGES.INVALID_SUM_MONEY);
    }

    const money = Number(sumMoney);
    if (money === 0 || money % LOTTO.PRICE != 0) {
      throw new Error(ERROR_MESSAGES.INVALID_SUM_MONEY);
    }
  },

  // 당첨 번호 유효성 검사
  validateWinningNumbers(input) {
    if (input.length !== 6) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBERS);
    }

    if (input.some((num) => isNaN(num) || num < LOTTO.MIN || num > LOTTO.MAX)) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBERS);
    }
        
    const uniqueNumbers = new Set(input);
    if (uniqueNumbers.size != LOTTO.COUNT) {
        throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBERS);
    }
    
  },

  // 보너스 번호 유효성 검사
  validateBonusNumbers(input) {
    if (isNaN(input) || input < LOTTO.MIN || input > LOTTO.MAX) {
        throw new Error(ERROR_MESSAGES.INVALID_BONUS_NUMBERS);
    }
  },

  // 보너스 번호가 당첨 번호에 포함되었는지
  validateBonusDuplicate(winningNumbers, bonusNumber) {
    if (winningNumbers.includes(bonusNumber)) {
        throw new Error(ERROR_MESSAGES.DUPLICATE_BONUS_NUMBERS);
    }
  }
};