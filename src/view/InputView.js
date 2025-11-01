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
};
