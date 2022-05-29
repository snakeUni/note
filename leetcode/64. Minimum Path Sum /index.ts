// https://leetcode.cn/problems/minimum-path-sum/solution/zui-xiao-lu-jing-he-by-leetcode-solution/
export function minPathSum(grid: number[][]): number {
  // 动态规划
  if (grid === null || grid.length === 0 || grid[0].length === 0) return 0

  const rows = grid.length,
    columns = grid[0].length
  const dp = new Array(rows).fill(0).map(() => new Array(columns).fill(0))
  dp[0][0] = grid[0][0]

  for (let i = 1; i < rows; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }

  for (let j = 1; j < columns; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j]
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }

  return dp[rows - 1][columns - 1]
}
