import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "../constants/message.js";

export const InputView = {
  // ===== 구입 금액 입력
  async readPurchaseAmount() {
    const purchaseAmount = await Console.readLineAsync(
      INPUT_MESSAGES.PURCHASE_AMOUNT
    );
    return purchaseAmount;
  },

  // ===== 당첨 번호 입력
  async readWinningNumbers() {
    const winningNumbers = await Console.readLineAsync(
      INPUT_MESSAGES.WINNING_NUMBERS
    );
    return winningNumbers;
  },

  // ===== 보너스 번호 입력
  async readBonusNumber() {
    const bonusNumber = await Console.readLineAsync(
      INPUT_MESSAGES.BONUS_NUMBER
    );
    return bonusNumber;
  },
};
