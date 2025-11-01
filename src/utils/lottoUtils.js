import { Random } from "@woowacourse/mission-utils";
import { LOTTO } from "../constants/lotto.js";

// 1~45 사이 중복없는 랜덤 값 6개 생성
export const createLottoNumbers = () => {
  return Random.pickUniqueNumbersInRange(
    LOTTO.MIN_NUMBER,
    LOTTO.MAX_NUMBER,
    LOTTO.NUMBER_COUNT
  );
};
