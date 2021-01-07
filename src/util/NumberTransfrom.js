export function number2wan(num) {
  if (typeof num !== 'number') {
    num = Number(num)
  }
  if (num >= 10000) {
    return ~~(num / 10000) + "万"
  }
  return num
}