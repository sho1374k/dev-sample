export class Session {
  clear() {
    sessionStorage.clear();
  }

  /**
   * @param {string} key // 削除するキー名
   */
  remove(key) {
    sessionStorage.removeItem(key);
    console.log("session remove", key);
  }

  /**
   * @param {string} key //取得したいキー名
   * @returns {string} // 値
   */
  get(key) {
    console.log("session get", key, sessionStorage.getItem(key));
    return sessionStorage.getItem(key);
  }

  /**
   * @param {string} key // セットしたいキー名
   * @param {string} value // セットしたい値
   */
  set(key, value) {
    sessionStorage.setItem(key, value);
    console.log("session set", key, value, sessionStorage.getItem(key));
  }
}
