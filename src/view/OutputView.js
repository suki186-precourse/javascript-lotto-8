import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "../constants/message.js";

export const OutputView = {
  // 로또 발행 수량 출력
  printLottoCount(count) {
    Console.print(OUTPUT_MESSAGES.PURCHASE_COUNT(count));
  },

  // 로또 발행 결과 출력
  printLottoList(lottos) {
    lottos.forEach((lotto) => {
      const numbers = lotto.getSortedNumbers();
      Console.print(`[${numbers.join(", ")}]`);
    });
  },
};
