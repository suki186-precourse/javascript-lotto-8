import { LOTTO } from "../constants/lotto.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = this.#sortNumbers(numbers);
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.NUMBER_COUNT) {
      throw new Error(
        `[ERROR] 로또 번호는 ${LOTTO.NUMBER_COUNT}개여야 합니다.`
      );
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
