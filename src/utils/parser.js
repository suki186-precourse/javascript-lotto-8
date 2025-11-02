import { COMMON } from "../constants/message.js";

// 당첨 번호 입력 자료형 변환 함수 (string -> number[])
export const parseWinningNumbers = (stringNumbers) => {
  return stringNumbers.split(COMMON.DELIMITERS).map(Number);
};

// 보너스 번호 입력 자료형 변환 함수 (string -> number)
export const parseBonusNumber = (stringNumber) => {
  return Number(stringNumber);
};
