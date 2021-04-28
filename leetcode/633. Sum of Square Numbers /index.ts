export function judgeSquareSum(c: number): boolean {
  // 如果是两个数的平方和，那么 a, b 任何一个数都应该比 c 的开平方要小
  // 并且思路应该反过来, 使用 c - a2 看是否能被开平方
  // 分别求 a, b 在里面是否存在
  for (let i = 0; i <= Math.floor(Math.sqrt(c)); i++) {
    const v = c - Math.pow(i, 2)

    const b = Math.sqrt(v)

    if (b === Math.floor(b)) {
      return true
    }
  }

  return false
}
