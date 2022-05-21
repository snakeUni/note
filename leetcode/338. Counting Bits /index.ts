// https://leetcode.cn/problems/counting-bits/solution/bi-te-wei-ji-shu-by-leetcode-solution-0t1i/
export function countBits(n: number): number[] {
  const bits = new Array(n + 1).fill(0)
  let highBit = 0
  for (let i = 1; i <= n; i++) {
    if ((i & (i - 1)) == 0) {
      highBit = i
    }
    bits[i] = bits[i - highBit] + 1
  }
  return bits
}
