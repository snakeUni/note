export function dailyTemperatures(temperatures: number[]): number[] {
  // 双循环暴力
  const res = []
  for (let i = 0; i < temperatures.length; i++) {
    let k = 0
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] && temperatures[j] > temperatures[i]) {
        k = j - i
        break
      }
    }
    res.push(k)
  }

  return res
}

// https://leetcode.cn/problems/daily-temperatures/solution/leetcode-tu-jie-739mei-ri-wen-du-by-misterbooo/
// 单调栈讲的很好,单调栈存储是下标
export function dailyTemperatures2(temperatures: number[]): number[] {
  const stack: number[] = []
  const res = new Array(temperatures.length).fill(0)

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length !== 0 &&
      temperatures[i] > temperatures[stack.pop() as number]
    ) {
      const index = stack.pop() as number
      res[index] = i - index
    }
  }

  return res
}
