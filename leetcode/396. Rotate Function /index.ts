// 根据给出的公式，很容易找到规律
// 当 1 <= k <= n 时，F(k) = F(k-1) + Sum(nums) - n * nums[n - k]
export function maxRotateFunction(nums: number[]): number {
  let f = 0,
    n = nums.length,
    numSum = nums.reduce((acc, cur) => acc + cur, 0)
  for (let i = 0; i < n; i++) {
    f += i * nums[i]
  }
  let res = f
  for (let i = n - 1; i > 0; i--) {
    f += numSum - n * nums[i]
    res = Math.max(res, f)
  }
  return res
}
