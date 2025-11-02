import LottoGame from "../src/domain/LottoGame";
import { createLottoNumbers } from "../src/utils/lottoUtils";

jest.mock("../src/utils/lottoUtils.js", () => ({
  ...jest.requireActual("../src/utils/lottoUtils.js"),
  createLottoNumbers: jest.fn(), // createLottoNumbers만 mock 함수로 대체
}));

describe("LottoGame 클래스 테스트", () => {
  // 각 테스트가 끝나면 mock 함수 기록 초기화
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("LottoGame 생성 시, 수량과 금액을 반환한다.", () => {
    const purchaseAmountString = "3000";

    const game = new LottoGame(purchaseAmountString);

    expect(game.getLottoCount()).toBe(3);
    expect(game.getPurchaseAmount()).toBe(3000);
  });

  test("getLottoCount만큼 로또를 생성한다.", () => {
    const game = new LottoGame("3000"); // 3개
    createLottoNumbers.mockReturnValue([1, 2, 3, 4, 5, 6]);

    game.createLottos();
    const lottos = game.getLottos();

    expect(lottos.length).toBe(3); // 3개인지
    expect(createLottoNumbers).toHaveBeenCalledTimes(3); // mock 함수가 3번 호출되었는지
  });

  test("calculateResults가 당첨 통계를 정확히 집계한다.", () => {
    const game = new LottoGame("3000"); // 3개
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    createLottoNumbers
      .mockReturnValueOnce([1, 2, 3, 4, 5, 6]) // 1등
      .mockReturnValueOnce([1, 2, 3, 4, 5, 7]) // 2등
      .mockReturnValueOnce([1, 2, 3, 8, 9, 10]); // 5등

    game.createLottos();
    game.setWinningInfo(winningNumbers, bonusNumber);
    const rankCounts = game.calculateResults();

    const expectedCounts = {
      FIRST: 1,
      SECOND: 1,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 1,
    };

    expect(rankCounts).toEqual(expectedCounts);
  });
});
