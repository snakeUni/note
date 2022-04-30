// https://leetcode-cn.com/problems/smallest-range-i/solution/zui-xiao-chai-zhi-i-by-leetcode-solution-7lcl/
export function smallestRangeI(nums: number[], k: number): number {
  const sortedArray = nums.sort((a, b) => a - b)
  const min = sortedArray[0]
  const max = sortedArray[sortedArray.length - 1]
  return max - min <= 2 * k ? 0 : max - min - 2 * k
}
