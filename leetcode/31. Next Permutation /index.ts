/**
 Do not return anything, modify nums in-place instead.
 */
export function nextPermutation(nums: number[]): void {
  let i = nums.length - 2

  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }

  if (i >= 0) {
    let j = nums.length - 1

    while (j >= 0 && nums[i] >= nums[j]) {
      j--
    }

    // 交换
    let tem = nums[i]
    nums[i] = nums[j]
    nums[j] = tem
  }

  // 将 i + 1 后的数列反转
  let left = i + 1,
    right = nums.length - 1

  while (left < right) {
    let tem = nums[left]
    nums[left] = nums[right]
    nums[right] = tem
    left++
    right--
  }
}
