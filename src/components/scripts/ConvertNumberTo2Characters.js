/**
 * @param {number} number // 整数
 * @returns {string} // 整数を2文字の番号として返す | EX）1 → "01"
 */
export const ConvertNumberTo2Characters = (number) => {
  const string = String(number);
  return string.length === 1 ? `0${string}` : string;
};
