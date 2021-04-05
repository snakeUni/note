export function twoSum(nums: number[], target: number): number[] {
  const res = []

  for (let i = 0; i < nums.length; i++) {
    let rest = target - nums[i]

    const targetIndex = nums.slice(i + 1).indexOf(rest)
    if (targetIndex > -1) {
      res.push(i, targetIndex + i + 1)
      break
    }
  }

  return res
}
