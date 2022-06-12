// https://leetcode.cn/problems/find-the-duplicate-number/solution/xun-zhao-zhong-fu-shu-by-leetcode-solution/
// 快慢指针成环形链表
export function findDuplicate(nums: number[]): number {
  let slow = 0,
    fast = 0

  slow = nums[slow]
  fast = nums[nums[fast]]

  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[nums[fast]]
  }

  slow = 0

  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[fast]
  }

  return slow
}
