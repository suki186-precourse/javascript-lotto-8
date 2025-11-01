// 일치하는 번호의 개수에 따른 등수 판별
export const calculateRank = (matchCount, hasBonus) => {
  if (matchCount === 6) {
    return "FIRST";
  }
  if (matchCount === 5 && hasBonus) {
    return "SECOND";
  }
  if (matchCount === 5 && !hasBonus) {
    return "THIRD";
  }
  if (matchCount === 4) {
    return "FOURTH";
  }
  if (matchCount === 3) {
    return "FIFTH";
  }
  return null; // 2개 이하
};
