export function rob(nums: number[]): number {
  if (nums.length === 0) return 0
  if (nums.length === 1) return nums[0]
  if (nums.length === 2) return Math.max(nums[0], nums[1])

  // 很明显的一个动态规划的题目，在过程中寻求最大值,如果从第一个开始偷
  // 那么只能偷到倒数第二个， [0, n - 2], 如果从二个开始偷那么只能
  // 偷到 [1, n - 1]

  const robRange = (nums: number[], start: number, end: number) => {
    let first = nums[start],
      second = Math.max(nums[start], nums[start + 1])
    for (let i = start + 2; i <= end; i++) {
      const temp = second
      second = Math.max(first + nums[i], second)
      first = temp
    }
    return second
  }

  return Math.max(
    robRange(nums, 0, nums.length - 2),
    robRange(nums, 1, nums.length - 1)
  )
}
