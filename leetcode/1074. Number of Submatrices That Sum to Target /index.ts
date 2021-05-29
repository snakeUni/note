export function numSubmatrixSumTarget(
  matrix: number[][],
  target: number
): number {
  const subarraySum = (nums: number[], k: number) => {
    const map = new Map()
    map.set(0, 1)
    let count = 0,
      pre = 0
    for (const x of nums) {
      pre += x
      if (map.has(pre - k)) {
        count += map.get(pre - k)
      }
      map.set(pre, (map.get(pre) || 0) + 1)
    }
    return count
  }

  let ans = 0
  const m = matrix.length,
    n = matrix[0].length
  for (let i = 0; i < m; ++i) {
    // 枚举上边界
    const sum = new Array(n).fill(0)
    for (let j = i; j < m; ++j) {
      // 枚举下边界
      for (let c = 0; c < n; ++c) {
        sum[c] += matrix[j][c] // 更新每列的元素和
      }
      ans += subarraySum(sum, target)
    }
  }
  return ans
}
