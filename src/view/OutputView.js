import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "../constants/message.js";

export const OutputView = {
  // 로또 발행 수량 출력
  printLottoCount(count) {
    Console.print(OUTPUT_MESSAGES.PURCHASE_COUNT(count));
  },
};
