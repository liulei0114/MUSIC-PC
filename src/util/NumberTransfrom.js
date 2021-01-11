export function number2wan(num) {
  if (num === null) return num
  if (typeof num !== 'number') {
    num = Number(num)
  }
  if (num >= 100000) {
    return ~~(num / 10000) + "万"
  }
  return num
}