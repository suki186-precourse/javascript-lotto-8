import { LOTTO } from "../constants/lotto.js";
import { ERROR, ERROR_MESSAGES } from "../constants/message.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = this.#sortNumbers(numbers);
  }

  #validate(numbers) {
    // 6개인지
    if (numbers.length !== LOTTO.NUMBER_COUNT) {
      throw new Error(`${ERROR} ${ERROR_MESSAGES.INVALID_NUMBER_COUNT}`);
    }

    // 중복된 번호가 있는지
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(`${ERROR} ${ERROR_MESSAGES.DUPLICATE_NUMBERS}`);
    }

    // 1~45 범위 밖의 숫자가 있는지
    const validRange = numbers.some(
      (num) => num < LOTTO.MIN_NUMBER || num > LOTTO.MAX_NUMBER
    );
    if (validRange) {
      throw new Error(`${ERROR} ${ERROR_MESSAGES.INVALID_NUMBER_RANGE}`);
    }
  }

  // 오름차순 정렬
  #sortNumbers(numbers) {
    return numbers.slice().sort((a, b) => a - b);
  }

  // 번호 반환
  getNumbers() {
    return this.#numbers;
  }

  // 정렬된 번호 반환
  getSortedNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
