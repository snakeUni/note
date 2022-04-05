export function hammingWeight(n: number): number {
  let sum = 0
  const nStr = n.toString(2)
  for (let i = 0; i < nStr.length; i++) {
    if (nStr[i] === '1') sum++
  }

  return sum
}

// 官网解答 1
/**
 * 判断 1 的个数，可以让 n 与 2^i 进行与运算，只有 n 的第 i 位为 1 使，与的结果才不为 0，否则
 * 结果都是 0，因为 2^i 的第 i 位是 1，其他都是 0。
 * 时间复杂度 O(k) 空间复杂度 O(1)
 * @param n
 * @returns
 */
export function hammingWeight1(n: number): number {
  let sum = 0
  for (let i = 0; i < 32; i++) {
    if ((n & (1 << i)) !== 0) {
      sum++
    }
  }
  return sum
}

// 官方解答2
/**
 * n&(n-1) 运算结果会把 n 的二进制位中的最低位的 1 变成 0
 * 如 6 & (6 - 1) = 4, 6 = (110), 4 = (100)，运算结果 4 即为把 6 的二进制位中的最低位的 1 变为 0 之后的结果。
 * @param n
 * @returns
 */
export function hammingWeight2(n: number): number {
  let sum = 0
  while (n) {
    n &= n - 1
    sum++
  }
  return sum
}
