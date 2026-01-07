import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "../constants.js";

export const OutputView = {
  // 로또 수량 출력
  printLottoCount(count) {
    Console.print(OUTPUT_MESSAGES.LOTTO_COUNT(count));
  },

  // 나의 로또들 출력
  printMyLottos(lottos) {
    lottos.forEach((lotto) => {
        Console.print(`[${lotto.numbers.join(', ')}]`);
    })
  },

  // 당첨 통계 출력
  printLottoResult(result) {
    Console.print(OUTPUT_MESSAGES.STATS_HEADER);
    // 각 개수 출력
    Console.print(OUTPUT_MESSAGES.FIFTH_PRIZE(result.FIFTH));
    Console.print(OUTPUT_MESSAGES.FOURTH_PRIZE(result.FOURTH));
    Console.print(OUTPUT_MESSAGES.THIRD_PRIZE(result.THIRD));
    Console.print(OUTPUT_MESSAGES.SECOND_PRIZE(result.SECOND));
    Console.print(OUTPUT_MESSAGES.FIRST_PRIZE(result.FIRST));
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