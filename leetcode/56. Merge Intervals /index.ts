export function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0])
  if (intervals.length === 1) return intervals
  const res: number[][] = [intervals[0]]

  for (let i = 1; i < intervals.length; i++) {
    const last = res.pop() as number[]
    const cur = intervals[i]

    // 判断是否发生重叠。
    // 不重叠, 当前最小比之前最大的大
    if (cur[0] > last[1]) {
      res.push(last)
      res.push(cur)
    } else if (cur[1] < last[0]) {
      // 当前最大比之前最小的还小
      res.push(cur)
      res.push(last)
    } else {
      const merged = [Math.min(last[0], cur[0]), Math.max(last[1], cur[1])]
      res.push(merged)
    }
  }

  return res
}
