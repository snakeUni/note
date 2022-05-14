export function threeSumClosest(nums: number[], target: number): number {
  const len = nums.length
  let res: number = 10000000
  // 这里需要注意排序的问题，如果直接使用 nums.sort() 那么负数排序就会错误，比如 [-2, -1, 4, 3]
  // 会被排成 [-1, -2, 3, 4] 升序排序
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len; i++) {
    // 避免重复
    if (i > 0 && nums[i] === nums[i - 1]) continue
    // 左指针
    let l = i + 1
    // 右指针
    let r = len - 1

    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r]

      if (sum === target) {
        return target
      }

      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum
      }

      if (sum > target) {
        while (l < r && nums[r] === nums[r - 1]) {
          r--
        }
        r--
      } else {
        while (l < r && nums[l] === nums[l + 1]) {
          l++
        }
        l++
      }
    }
  }

  return res
}
