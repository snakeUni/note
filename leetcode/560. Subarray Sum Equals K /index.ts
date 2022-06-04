export function subarraySum(nums: number[], k: number): number {
  // 求个计算，算是暴力解法了
  let count = 0

  for (let start = 0; start < nums.length; start++) {
    let sum = 0

    for (let end = start; end >= 0; end--) {
      sum += nums[end]

      if (sum === k) {
        count++
      }
    }
  }

  return count
}

// 前缀和  + hash 求解
export function subarraySum2(nums: number[], k: number): number {
  const map = new Map()
  map.set(0, 1)
  let count = 0,
    pre = 0

  for (const num of nums) {
    pre += num

    if (map.has(pre - k)) {
      count += map.get(pre - k)
    }

    if (map.has(pre)) {
      map.set(pre, map.get(pre) + 1)
    } else {
      map.set(pre, 1)
    }
  }

  return count
}
