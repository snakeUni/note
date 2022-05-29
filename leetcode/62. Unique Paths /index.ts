// https://leetcode.cn/problems/unique-paths/solution/bu-tong-lu-jing-by-leetcode-solution-hzjf/
// 动态规划
export function uniquePaths(m: number, n: number): number {
  const f = new Array(m).fill(0).map(() => new Array(n).fill(0))

  for (let i = 0; i < m; i++) {
    f[i][0] = 1
  }

  for (let j = 0; j < n; j++) {
    f[0][j] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      f[i][j] = f[i - 1][j] + f[i][j - 1]
    }
  }

  return f[m - 1][n - 1]
}

// 组合数学
export function uniquePaths2(m: number, n: number) {
  let res = 1
  // 阶乘
  for (let x = n, y = 1; y < m; ++x, ++y) {
    res = Math.floor((res * x) / y)
  }

  return res
}
