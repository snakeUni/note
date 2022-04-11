export function countNumbersWithUniqueDigits(n: number): number {
  if (n === 0) return 1
  if (n === 1) return 10

  // 看起来是一个数列，0位数的组合 + 1 位数的组合 + 2 位数的组合  + n 位数的组合
  const array = [
    1,
    9,
    9 * 9,
    9 * 9 * 8,
    9 * 9 * 8 * 7,
    9 * 9 * 8 * 7 * 6,
    9 * 9 * 8 * 7 * 6 * 5,
    9 * 9 * 8 * 7 * 6 * 5 * 4,
    9 * 9 * 8 * 7 * 6 * 5 * 4 * 3
  ]

  let result = 0

  for (let i = 0; i <= n; i++) {
    result += array[i]
  }

  return result
}
