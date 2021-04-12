export function largestNumber(nums: number[]): string {
  // 应该转化为字符串并且指定补全后面的位数
  nums.sort((a, b) => {
    return `${a}${b}` < `${b}${a}` ? 1 : -1
  })

  return nums[0] === 0 ? '0' : nums.join('')
}
