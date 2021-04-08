export function findMin(nums: number[]): number {
  if (nums[0] > nums[nums.length - 1]) {
    // 从右边遍历
    for (let i = nums.length - 1; i >= 1; i--) {
      if (nums[i - 1] > nums[i]) return nums[i]
    }
  } else {
    return nums[0]
  }

  return nums[0]
}
