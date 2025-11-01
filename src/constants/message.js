import { PRIZE } from "./lotto.js";

// 입력 메세지
export const INPUT_MESSAGES = Object.freeze({
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
  WINNING_NUMBERS: "\n당첨 번호를 입력해 주세요.\n",
  BONUS_NUMBER: "\n보너스 번호를 입력해 주세요.\n",
});

// 출력 메세지
export const OUTPUT_MESSAGES = Object.freeze({
  PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  STATISTICS_HEADER: "\n당첨 통계\n---",
  FIFTH_PRIZE: (count) =>
    `3개 일치 (${PRIZE.FIFTH.toLocaleString()}원) - ${count}개`,
  FOURTH_PRIZE: (count) =>
    `4개 일치 (${PRIZE.FOURTH.toLocaleString()}원) - ${count}개`,
  THIRD_PRIZE: (count) =>
    `5개 일치 (${PRIZE.THIRD.toLocaleString()}원) - ${count}개`,
  SECOND_PRIZE: (count) =>
    `5개 일치, 보너스 볼 일치 (${PRIZE.SECOND.toLocaleString()}원) - ${count}개`,
  FIRST_PRIZE: (count) =>
    `6개 일치 (${PRIZE.FIRST.toLocaleString()}원) - ${count}개`,
  RETURN_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
});

/**
 * @param DELIMITERS 구분자
 */
export const COMMON = Object.freeze({
  DELIMITERS: ",",
});
