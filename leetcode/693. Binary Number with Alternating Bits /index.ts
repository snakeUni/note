// 这种方法是纯粹用数学的知识，也可以使用其他的，正常的循环判断
export function hasAlternatingBits(n: number): boolean {
  // 首先如果出现间隔只有第一位是 1 或第一位是 0 的情况，那就是 10 或 01，那么必然成等比数列
  // 根据等比数列的求和公式，可知存在两种情况，a1 = 2 或 a1 = 1，公比为 4，至此只需要判断两种情况即可。
  if (n === 2 || n === 1) return true
  const s1 = (n * 3) / 2 + 1
  const s2 = n * 3 + 1
  const pow1 = (Math.log(s1) / Math.log(4)).toString()
  const pow2 = (Math.log(s2) / Math.log(4)).toString()
  if (pow1.indexOf('.') > -1 && pow2.indexOf('.') > -1) return false
  return true
}

export function hasAlternatingBits2(n: number): boolean {
  // 时间复杂度：O(logn)。输入 n 的二进制表示最多有 O(logn) 位。
  // 空间复杂度：O(1)。使用了常数空间来存储中间变量。

  let prev = 2
  while (n !== 0) {
    const cur = n % 2
    if (cur === prev) {
      return false
    }
    prev = cur
    n = Math.floor(n / 2)
  }
  return true
}

/**
另外一种更为巧妙的方式是利用交替位二进制数性质。

当给定值 n 为交替位二进制数时，将 n 右移一位得到的值 m 仍为交替位二进制数，且与原数 n 错开一位，
两者异或能够得到形如 0000...1111 的结果 x，此时对 x 执行加法（进位操作）能够得到形如 0000...1000的结果，
将该结果与 x 执行按位能够得到全 0 结果。

 * @param n 
 * @returns 
 */
export function hasAlternatingBits3(n: number): boolean {
  const a = n ^ (n >> 1)
  return (a & (a + 1)) === 0
}
