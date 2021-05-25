export function minChanges(nums: number[], k: number): number {
  // x 的范围为 [0, 2^10)
  const MAXX = 2 ** 10

  const n = nums.length
  let f = new Array(MAXX).fill(Number.MAX_VALUE)
  // 边界条件 f(-1,0)=0
  f[0] = 0

  for (let i = 0; i < k; i++) {
    // 第 i 个组的哈希映射
    const count = new Map()
    let size = 0
    for (let j = i; j < n; j += k) {
      count.has(nums[j])
        ? count.set(nums[j], count.get(nums[j]) + 1)
        : count.set(nums[j], 1)
      size++
    }

    // 求出 t2
    const t2min = Math.min(...f)

    const g = new Array(MAXX).fill(t2min)
    for (let mask = 0; mask < MAXX; mask++) {
      // t1 则需要枚举 x 才能求出
      for (const [x, countx] of count.entries()) {
        g[mask] = Math.min(g[mask], f[mask ^ x] - countx)
      }
    }

    // 别忘了加上 size
    for (const [index, val] of g.entries()) {
      f[index] = val + size
    }
  }

  return f[0]
}
