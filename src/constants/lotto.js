// 로또 기본 정보
/**
 *  @param PRICE 가격
 *  @param MIN_NUMBER 최솟값
 *  @param MAX_NUMBER 최댓값
 *  @param NUMBER_COUNT 번호 개수
 */
export const LOTTO = Object.freeze({
  PRICE: 1000,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_COUNT: 6,
});

// 등수별 당첨금
/**
 *  @param FIRST 6개 일치 -> 2,000,000,000원
 *  @param SECOND 5개 + 보너스 일치 -> 30,000,000원
 *  @param THIRD 5개 일치 -> 1,500,000원
 *  @param FOURTH 4개 일치 -> 50,000원
 *  @param FIFTH 3개 일치 -> 5,000원
 *  @param NONE 나머지 -> 0원
 */
export const PRIZE = Object.freeze({
  FIRST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000,
  NONE: 0,
});

// 당첨 기준(일치 번호 개수, 보너스 여부)
export const WINNING_CONDITIONS = Object.freeze({
  FIRST: { match: 6, bonus: false, prize: PRIZE.FIRST },
  SECOND: { match: 5, bonus: true, prize: PRIZE.SECOND },
  THIRD: { match: 5, bonus: false, prize: PRIZE.THIRD },
  FOURTH: { match: 4, bonus: false, prize: PRIZE.FOURTH },
  FIFTH: { match: 3, bonus: false, prize: PRIZE.FIFTH },
});
