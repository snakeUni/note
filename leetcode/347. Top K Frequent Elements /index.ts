export function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1)
    } else {
      map.set(nums[i], 1)
    }
  }

  const queue: number[][] = []

  map.forEach((value, key) => {
    queue.push([value, key])
  })

  // 对 queue 进行降序
  queue.sort((a, b) => b[0] - a[0])
  const ans = []
  for (let i = 0; i < k; i++) {
    ans[i] = queue[i][1]
  }

  return ans
}
