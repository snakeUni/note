export function canJump(nums: number[]): boolean {
  // 贪心算法
  const n = nums.length
  let rightmost = 0

  for (let i = 0; i < n; i++) {
    if (i <= rightmost) {
      rightmost = Math.max(rightmost, i + nums[i])

      if (rightmost >= n - 1) {
        return true
      }
    }
  }

  return false
}
