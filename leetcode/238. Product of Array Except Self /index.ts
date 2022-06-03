// 不是 O(1) 空间
export function productExceptSelf(nums: number[]): number[] {
  const L = [],
    R = [],
    ans = []

  L[0] = 1
  R[nums.length - 1] = 1

  for (let i = 1; i < nums.length; i++) {
    L[i] = nums[i - 1] * L[i - 1]
  }

  for (let i = nums.length - 2; i >= 0; i--) {
    R[i] = nums[i + 1] * R[i + 1]
  }

  for (let i = 0; i < nums.length; i++) {
    ans[i] = L[i] * R[i]
  }

  return ans
}

// O(1) 空间内可以去掉左右数组，用 res 的左侧代表左侧所有乘积
export function productExceptSelf2(nums: number[]): number[] {
  const ans = []
  ans[0] = 1

  for (let i = 1; i < nums.length; i++) {
    ans[i] = nums[i - 1] * ans[i - 1]
  }

  let R = 1

  for (let i = nums.length - 1; i >= 0; i--) {
    ans[i] = ans[i] * R
    R *= nums[i]
  }

  return ans
}
