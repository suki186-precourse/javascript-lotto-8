import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "../constants.js";
import { Validator } from "./Validator.js";

export const InputView = {
  // ===== 구입 금액 입력
  async readSumMoney() {
    const sumMoney = await Console.readLineAsync(
      INPUT_MESSAGES.SUM_MONEY_HEADER
    );
    Validator.validateSumMoney(sumMoney);

    return sumMoney;
  },

  // ===== 당첨 번호 입력
  async readWinningNumbers() {
    const input = await Console.readLineAsync(
      INPUT_MESSAGES.WINNING_NUMBERS_HEADER
    );

    const winningNumbers = input.split(',').map((num) => Number(num.trim()));
    Validator.validateWinningNumbers(winningNumbers);

    return winningNumbers;
  },

  // ===== 보너스 번호 입력
  async readBonusNumber() {
    const input = await Console.readLineAsync(
      INPUT_MESSAGES.BONUS_NUMBER_HEADER
    );
    
    const bonusNumber = Number(input);
    Validator.validateBonusNumbers(bonusNumber);
    
    return bonusNumber;
  },
};