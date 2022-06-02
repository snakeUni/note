export function longestConsecutive(nums: number[]): number {
  // 连续的条件是下一个总比上一个大于 1
  if (nums.length === 0) return 0
  if (nums.length === 1) return 1
  const sortedNums = [...new Set(nums)].sort((a, b) => a - b)
  let count = 0,
    res = 0
  for (let i = 1; i < sortedNums.length; i++) {
    if (sortedNums[i] - sortedNums[i - 1] === 1) {
      count++
    } else {
      res = Math.max(res, count)
      count = 0
    }
  }

  res = Math.max(res, count)

  return res + 1
}
