export function findTargetSumWays(nums: number[], target: number): number {
  let count = 0
  const backtrack = (
    nums: number[],
    target: number,
    index: number,
    sum: number
  ) => {
    if (index === nums.length) {
      if (sum === target) {
        count++
      }
    } else {
      backtrack(nums, target, index + 1, sum + nums[index])
      backtrack(nums, target, index + 1, sum - nums[index])
    }
  }

  backtrack(nums, target, 0, 0)
  return count
}
