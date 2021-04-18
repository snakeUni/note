export function removeDuplicates(nums: number[]): number {
  const v = [...new Set(nums)]

  for (let i = 0; i < v.length; i++) {
    nums[i] = v[i]
  }

  return v.length
}

export function removeDuplicates2(nums: number[]): number {
  if (nums.length == 0) return 0
  let i = 0
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] != nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
}
