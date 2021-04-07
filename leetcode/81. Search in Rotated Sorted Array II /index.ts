export function search(nums: number[], target: number): boolean {
  if (nums[0] <= target) {
    // 遍历左边即可
    for (let i = 0; i < nums.length; i++) {
      if (target > nums[i]) continue
      if (target < nums[i]) break
      if (target === nums[i]) {
        return true
      }
    }
  } else {
    for (let i = nums.length - 1; i >= 0; i--) {
      if (target < nums[i]) continue
      if (target > nums[i]) break

      if (target === nums[i]) return true
    }
  }

  return false
}
