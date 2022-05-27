export function searchRange(nums: number[], target: number): number[] {
  if (nums.length === 0) return [-1, -1]

  const length = nums.length
  let left = 0,
    right = length - 1
  const res = [-1, -1]

  while (left <= right) {
    if (nums[left] === target && nums[right] === target) {
      res[0] = left
      res[1] = right
      return res
    }

    if (nums[left] === target && nums[right] !== target) {
      res[0] = left
      right--
    }

    if (nums[left] !== target && nums[right] === target) {
      res[1] = right
      left++
    }

    if (nums[left] !== target && nums[right] !== target) {
      left++
      right--
    }
  }

  return res
}
