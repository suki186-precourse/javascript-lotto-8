// 입력 메세지
export const INPUT_MESSAGES = Object.freeze({
  SUM_MONEY_HEADER: "구입금액을 입력해 주세요.\n",
  WINNING_NUMBERS_HEADER: "\n당첨 번호를 입력해 주세요.\n",
  BONUS_NUMBER_HEADER: "\n보너스 번호를 입력해 주세요.\n",
});

// 출력 메세지
export const OUTPUT_MESSAGES = Object.freeze({
  LOTTO_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  STATS_HEADER: "\n당첨 통계\n---",
  FIFTH_PRIZE: (count) => `3개 일치 (5,000원) - ${count}개`,
  FOURTH_PRIZE: (count) => `4개 일치 (50,000원) - ${count}개`,
  THIRD_PRIZE: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  SECOND_PRIZE: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  FIRST_PRIZE: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
  RETURN_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
});


export const COMMON = Object.freeze({
  DELIMITERS: ",",
  SUM_MONEY_REGEXP: "/[^0-9]/"
});

// 로또 관련 상수
export const LOTTO = Object.freeze({
    PRICE: 1000,
    COUNT: 6,
    MIN: 1,
    MAX: 45
})

// 등수별 당첨 금액
export const PRIZE = Object.freeze({
    FIRST: 2000000000,
    SECOND: 30000000,
    THIRD: 1500000,
    FOURTH: 50000,
    FIFTH: 5000
})

// ===== 예외 처리
export const ERROR = "[ERROR]";

export const ERROR_MESSAGES = Object.freeze({
  INVALID_SUM_MONEY: `${ERROR} 구입 금액은 1000단위의 숫자만 입력 가능합니다.`,
  INVALID_WINNING_NUMBERS: `${ERROR} 당첨 번호는 중복 없이 1~45의 숫자 6개를 입력해야 합니다. (,로 구분)`,
  INVALID_BONUS_NUMBERS: `${ERROR} 보너스 번호는 1~45의 숫자 1개를 입력해야 합니다.`,
  DUPLICATE_BONUS_NUMBERS: `${ERROR} 보너스 번호는 당첨 번호와 중복될 수 없습니다.`,
});