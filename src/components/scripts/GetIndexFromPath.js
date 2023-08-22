/**
 * @param {path} path // 絶対パス | EX）/hoge/fuga/1
 * @returns 最後のファイル名の番号をindex番号として返す
 */
export const GetIndexFromPath = (path) => {
  const array = path.split("/");
  const index = Number(array[array.length - 1]);
  return index;
};
