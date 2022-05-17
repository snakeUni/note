// https://leetcode.cn/problems/rectangle-area/solution/ju-xing-mian-ji-by-leetcode-solution-xzbl/
export function computeArea(
  ax1: number,
  ay1: number,
  ax2: number,
  ay2: number,
  bx1: number,
  by1: number,
  bx2: number,
  by2: number
): number {
  const area1 = (ax2 - ax1) * (ay2 - ay1),
    area2 = (bx2 - bx1) * (by2 - by1)
  const overlapWidth = Math.min(ax2, bx2) - Math.max(ax1, bx1),
    overlapHeight = Math.min(ay2, by2) - Math.max(ay1, by1)
  const overlapArea = Math.max(overlapWidth, 0) * Math.max(overlapHeight, 0)
  return area1 + area2 - overlapArea
}
