// https://leetcode.cn/problems/3sum/solution/pai-xu-shuang-zhi-zhen-zhu-xing-jie-shi-python3-by/
export function threeSum(nums: number[]): number[][] {
  const len = nums.length
  const res: number[][] = []
  // 数组长度小于 3
  if (len < 3) return res
  // 这里需要注意排序的问题，如果直接使用 nums.sort() 那么负数排序就会错误，比如 [-2, -1, 4, 3]
  // 会被排成 [-1, -2, 3, 4]
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) {
      // 因为是升序，那不可能存在
      return res
    }
    // 避免重复
    if (i > 0 && nums[i] === nums[i - 1]) continue
    // 左指针
    let l = i + 1
    // 右指针
    let r = len - 1

    while (l < r) {
      if (nums[i] + nums[l] + nums[r] === 0) {
        res.push([nums[i], nums[l], nums[r]])
        while (l < r && nums[l] === nums[l + 1]) {
          l++
        }
        while (l < r && nums[r] === nums[r - 1]) {
          r--
        }

        l++
        r--
      } else if (nums[i] + nums[l] + nums[r] > 0) {
        r--
      } else {
        l++
      }
    }
  }

  return res
}
