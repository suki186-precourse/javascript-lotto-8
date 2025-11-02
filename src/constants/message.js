import { LOTTO, PRIZE } from "./lotto.js";

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
 * @param INVALID_NUMBER_REGEX 잘못된 로또 번호 정규식
 */
export const COMMON = Object.freeze({
  DELIMITERS: ",",
  INVALID_WINNING_NUMBER_REGEX: /[^0-9,]/,
  INVALID_BONUS_NUMBER_REGEX: /[^0-9]/,
});

// ===== 예외 처리
export const ERROR = "[ERROR]";

export const ERROR_MESSAGES = Object.freeze({
  // 1. 로또 구입 금액
  INVALID_PURCHASE_AMOUNT: `구입 금액은 정수만 입력 가능합니다.`,
  UNDER_MIN_PURCHASE_AMOUNT: `구입 금액은 ${LOTTO.PRICE}원 이상이어야 합니다.`,
  PURCHASE_AMOUNT_UNIT: `구입 금액은 ${LOTTO.PRICE}원 단위로 입력 가능합니다.`,

  // 2. 당첨 번호
  INVALID_WINNING_NUMBERS: `쉼표(,)로 구분된 6개의 숫자를 입력하세요.(공백 불가)`,
  EMPTY_WINNING_NUMBERS: `당첨 번호를 입력해 주세요.`,
  INVALID_NUMBER_RANGE: `당첨 번호는 ${LOTTO.MIN_NUMBER}~${LOTTO.MAX_NUMBER} 사이의 숫자여야 합니다.`,
  INVALID_NUMBER_COUNT: `당첨 번호는 ${LOTTO.NUMBER_COUNT}개만 입력 가능합니다.`,
  DUPLICATE_NUMBERS: `당첨 번호는 중복될 수 없습니다.`,

  // 3. 보너스 번호
  INVALID_BONUS_COUNT: `보너스 번호는 1개의 정수여야 합니다.`,
  INVALID_BONUS_RANGE: `보너스 번호는 ${LOTTO.MIN_NUMBER}~${LOTTO.MAX_NUMBER} 사이의 숫자여야 합니다.`,
  EMPTY_BONUS_NUMBER: `보너스 번호를 입력해 주세요.`,
  DUPLICATE_BONUS: `보너스 번호는 당첨 번호와 중복될 수 없습니다.`,
});
