export function deleteAndEarn(nums: number[]): number {
  const rob = (nums: number[]): number => {
    const size = nums.length
    let first = nums[0],
      second = Math.max(nums[0], nums[1])
    for (let i = 2; i < size; i++) {
      let temp = second
      second = Math.max(first + nums[i], second)
      first = temp
    }

    return second
  }

  let maxVal = 0
  for (const val of nums) {
    maxVal = Math.max(maxVal, val)
  }
  const sum = new Array(maxVal + 1).fill(0)
  for (const val of nums) {
    // 通过这样默认已经被排序了, 因为作为下标，如果是下一个那么最多
    // 就是大于 1，因此只需要按照小偷偷家那题思路即可
    sum[val] += val
  }

  return rob(sum)
}
