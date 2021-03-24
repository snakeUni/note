/**
 * 给你一个整数数组 nums ，数组中共有 n 个整数。132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j] 。
如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false 。

进阶：很容易想到时间复杂度为 O(n^2) 的解决方案，你可以设计一个时间复杂度为 O(n logn) 或 O(n) 的解决方案吗？

示例 1：

输入：nums = [1,2,3,4]
输出：false
解释：序列中不存在 132 模式的子序列。
示例 2：

输入：nums = [3,1,4,2]
输出：true
解释：序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
示例 3：

输入：nums = [-1,3,2,0]
输出：true
解释：序列中有 3 个 132 模式的的子序列：[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。
 

提示：

n == nums.length
1 <= n <= 104
-109 <= nums[i] <= 109

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  // 使用单调栈来解决
  const length = nums.length
  let max = -Number.MAX_SAFE_INTEGER
  const candidate = [nums[length - 1]]

  for (let i = length - 2; i >= 0; i--) {
    if (nums[i] < max) {
      console.log('子序列', [nums[i], candidate[0], max])
      return true
    }

    while (candidate.length && nums[i] > candidate[candidate.length - 1]) {
      max = candidate[candidate.length - 1]
      candidate.pop()
    }

    // 只有大才会进栈，小就不进栈
    if (nums[i] > max) {
      candidate.push(nums[i])
    }
  }

  return false
}

console.log(find132pattern([3, 5, 0, 3, 4]))
console.log(find132pattern([1, 2, 3, 4]))
console.log(find132pattern([-1, 3, 2, 0]))
console.log(find132pattern([3, 1, 4, 2]))

// 找出所有的子序列, 使用二叉树来构建

var findAll132pattern = function (nums) {
  const children = []
}
