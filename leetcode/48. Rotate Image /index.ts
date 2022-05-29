/**
 Do not return anything, modify matrix in-place instead.
 https://leetcode.cn/problems/rotate-image/solution/xuan-zhuan-tu-xiang-by-leetcode-solution-vu3m/
 */
export function rotate(matrix: number[][]): void {
  const n = matrix.length
  // 水平翻转
  // matrix[row][col] = matrix[n−row−1][col]
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n; j++) {
      ;[matrix[i][j], matrix[n - i - 1][j]] = [
        matrix[n - i - 1][j],
        matrix[i][j]
      ]
    }
  }
  // 主对角线翻转
  // matrix[row][col] = matrix[col][row]
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
}
