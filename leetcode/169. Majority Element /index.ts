// https://leetcode-cn.com/problems/majority-element/solution/duo-shu-yuan-su-by-leetcode-solution/ 投票算法
export function majorityElement(nums: number[]): number {
  let count = 0
  let candidate = 0

  for (let num of nums) {
    if (count == 0) {
      candidate = num
    }
    count += num == candidate ? 1 : -1
  }

  return candidate
}
