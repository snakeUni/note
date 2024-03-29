// https://leetcode-cn.com/problems/range-sum-query-mutable/
/**
 * 本题的解法建议看官方解法，官方解法使用了多种方式。
 */
export class NumArray {
  nums: number[]
  constructor(nums: number[]) {
    this.nums = nums
  }

  update(index: number, val: number): void {
    this.nums[index] = val
  }

  sumRange(left: number, right: number): number {
    let sum = 0
    for (let i = left; i < right + 1; i++) {
      sum += this.nums[i]
    }

    return sum
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
