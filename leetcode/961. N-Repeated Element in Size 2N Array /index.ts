export function repeatedNTimes(nums: number[]): number {
  // 因为有 n + 1 个不同的元素，n 的元素重复，那么最多只需要循环 n + 2 就足够了
  const numSet = new Set()
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    if (!numSet.has(nums[i])) {
      numSet.add(nums[i])
    } else {
      res = nums[i]
      break
    }
  }

  return res
}

// 随机选择
export function repeatedNTimes2(nums: number[]): number {
  const n = nums.length

  while (true) {
    const x = Math.floor(Math.random() * n),
      y = Math.floor(Math.random() * n)
    if (x !== y && nums[x] === nums[y]) {
      return nums[x]
    }
  }
}
