import { ERROR, ERROR_MESSAGES } from "../src/constants/message";
import Lotto from "../src/domain/Lotto";

describe("로또 클래스 테스트", () => {
  test("당첨 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(`${ERROR} ${ERROR_MESSAGES.INVALID_NUMBER_COUNT}`);
  });

  test("당첨 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(`${ERROR} ${ERROR_MESSAGES.DUPLICATE_NUMBERS}`);
  });

  test("당첨 번호에 1~45 범위를 벗어난 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow(`${ERROR} ${ERROR_MESSAGES.INVALID_NUMBER_RANGE}`);
  });

  test("당첨 번호를 오름차순으로 정렬하여 반환한다.", () => {
    const numbers = [9, 8, 7, 6, 5, 4];
    const lotto = new Lotto(numbers);

    const sortedNumbers = lotto.getSortedNumbers();

    expect(sortedNumbers).toEqual([4, 5, 6, 7, 8, 9]);
  });
});
