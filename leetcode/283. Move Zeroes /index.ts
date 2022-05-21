/**
 Do not return anything, modify nums in-place instead.
 */
export function moveZeroes(nums: number[]): void {
  // p1 总是指向第一个 0 的位置。双指针
  let p1 = 0,
    p2 = 0

  while (p2 < nums.length) {
    if (nums[p2] !== 0) {
      const tem = nums[p1]
      nums[p1] = nums[p2]
      nums[p2] = tem
      p1++
    }

    p2++
  }
}
