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

  // 당첨 통계 결과 출력
  printStatistics(rankCounts) {
    Console.print(OUTPUT_MESSAGES.STATISTICS_HEADER);
    Console.print(OUTPUT_MESSAGES.FIFTH_PRIZE(rankCounts.FIFTH));
    Console.print(OUTPUT_MESSAGES.FOURTH_PRIZE(rankCounts.FOURTH));
    Console.print(OUTPUT_MESSAGES.THIRD_PRIZE(rankCounts.THIRD));
    Console.print(OUTPUT_MESSAGES.SECOND_PRIZE(rankCounts.SECOND));
    Console.print(OUTPUT_MESSAGES.FIRST_PRIZE(rankCounts.FIRST));
  },

  // 수익률 출력
  printReturnRate(returnRate) {
    Console.print(OUTPUT_MESSAGES.RETURN_RATE(returnRate));
  },

  // 에러메세지 출력
  printError(error) {
    Console.print(error.message);
  },
};
