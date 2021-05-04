/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
export var minCost = function (
  houses: number[],
  cost: number[][],
  m: number,
  n: number,
  target: number
) {
  // 将颜色调整为从 0 开始编号，没有被涂色标记为 -1
  houses = houses.map(c => --c)
  const dp = new Array(m)
    .fill(0)
    .map(() =>
      new Array(n).fill(0).map(() => new Array(target).fill(Number.MAX_VALUE))
    )

  // dp 所有元素初始化为极大值
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (houses[i] !== -1 && houses[i] !== j) {
        continue
      }

      for (let k = 0; k < target; ++k) {
        for (let j0 = 0; j0 < n; ++j0) {
          if (j === j0) {
            if (i === 0) {
              if (k === 0) {
                dp[i][j][k] = 0
              }
            } else {
              dp[i][j][k] = Math.min(dp[i][j][k], dp[i - 1][j][k])
            }
          } else if (i > 0 && k > 0) {
            dp[i][j][k] = Math.min(dp[i][j][k], dp[i - 1][j0][k - 1])
          }
        }

        if (dp[i][j][k] !== Number.MAX_VALUE && houses[i] === -1) {
          dp[i][j][k] += cost[i][j]
        }
      }
    }
  }

  let ans = Number.MAX_VALUE
  for (let j = 0; j < n; ++j) {
    ans = Math.min(ans, dp[m - 1][j][target - 1])
  }
  return ans === Number.MAX_VALUE ? -1 : ans
}
