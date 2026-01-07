import { ERROR_MESSAGES } from "../constants.js";

class Lotto {
    #numbers;

    constructor(numbers) {
        this.#validate(numbers);
        this.#numbers = this.#sortNumbers(numbers);
    }

    get numbers() {
        return this.#numbers;
    }

    // 오름차순 정렬
    #sortNumbers(numbers) {
        return numbers.slice().sort((a, b) => a - b);
    }

    // 유효성 검사 (예정)
    #validate(numbers) {
        if (numbers.length !== 6 || numbers.some((num) => isNaN(num) || num < 1 || num > 45)) {
            throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBERS);
        }
            
        const uniqueNumbers = new Set(numbers);
        if (uniqueNumbers.size != 6) {
            throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUMBERS);
        }
    }
}
export default Lotto;