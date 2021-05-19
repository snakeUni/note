export function kthLargestValue(matrix: number[][], k: number): number {
  // 通过维护前缀和
  const m = matrix.length,
    n = matrix[0].length
  const pre = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  const results = []
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      pre[i][j] =
        pre[i - 1][j] ^ pre[i][j - 1] ^ pre[i - 1][j - 1] ^ matrix[i - 1][j - 1]
      results.push(pre[i][j])
    }
  }
  results.sort((a, b) => b - a)
  return results[k - 1]
}
