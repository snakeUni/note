/**
 *https://leetcode-cn.com/problems/lexicographical-numbers/solution/zi-dian-xu-pai-shu-by-leetcode-solution-98mz/
 * @param n
 * @returns
 */
export function lexicalOrder(n: number): number[] {
  const ret = []
  let number = 1
  for (let i = 0; i < n; i++) {
    ret.push(number)
    if (number * 10 <= n) {
      number *= 10
    } else {
      while (number % 10 === 9 || number + 1 > n) {
        number = Math.floor(number / 10)
      }
      number++
    }
  }
  return ret
}
