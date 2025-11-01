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

// 로또 하나와 당첨/보너스 번호 비교
export const compareLotto = (lotto, winningNumbers, bonusNumber) => {
  const lottoNumbers = lotto.getNumbers();

  // 일치하는 번호 개수 계산
  const matchCount = lottoNumbers.filter((number) =>
    winningNumbers.includes(number)
  ).length;

  // 보너스 번호 일치 여부 계산
  const hasBonus = lottoNumbers.includes(bonusNumber);

  return { matchCount, hasBonus };
};
