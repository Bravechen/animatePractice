/**
 * @public
 * @description 获取一个唯一的id字符串
 * @returns {string}
 */
export function getSysId() {
  return [randomStr(), "-", randomStr()].join("");
}

export function randomStr() {
  return Number(0xffffff * Math.random())
    .toString(16)
    .replace(/\./g, "");
}

export default {
  getSysId,
  randomStr
};
