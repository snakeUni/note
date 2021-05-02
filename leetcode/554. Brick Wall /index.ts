export function leastBricks(wall: number[][]): number {
  const cnt = new Map()
  for (const widths of wall) {
    const n = widths.length
    let sum = 0
    for (let i = 0; i < n - 1; i++) {
      sum += widths[i]
      cnt.set(sum, (cnt.get(sum) || 0) + 1)
    }
  }
  let maxCnt = 0
  for (const [_, c] of cnt.entries()) {
    maxCnt = Math.max(maxCnt, c)
  }
  return wall.length - maxCnt
}
