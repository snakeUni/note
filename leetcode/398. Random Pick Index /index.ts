export class Solution {
  numsMap: Map<number, number[]> = new Map()
  constructor(nums: number[]) {
    for (let i = 0; i < nums.length; i++) {
      this.numsMap.set(nums[i], (this.numsMap.get(nums[i]) || []).concat(i))
    }
  }

  pick(target: number): number {
    let v = this.numsMap.get(target) || []
    return v[Math.floor(Math.random() * v.length)]
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */

/**
 * 抽样 https://leetcode-cn.com/problems/random-pick-index/solution/sui-ji-shu-suo-yin-by-leetcode-solution-ofsq/
 */
export class Solution2 {
  nums: number[] = []
  constructor(nums: number[]) {
    this.nums = nums
  }

  pick(target: number): number {
    let ans = 0
    for (let i = 0, cnt = 0; i < this.nums.length; ++i) {
      if (this.nums[i] == target) {
        ++cnt // 第 cnt 次遇到 target
        if (Math.floor(Math.random() * cnt) === 0) {
          ans = i
        }
      }
    }
    return ans
  }
}
