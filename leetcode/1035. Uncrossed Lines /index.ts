export function maxUncrossedLines(nums1: number[], nums2: number[]): number {
  // 最长公共子序列
  const m = nums1.length,
    n = nums2.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    const num1 = nums1[i - 1]
    for (let j = 1; j <= n; j++) {
      const num2 = nums2[j - 1]
      if (num1 === num2) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[m][n]
}
