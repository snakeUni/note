// https://zh.wikipedia.org/wiki/%E5%8F%89%E7%A7%AF
// 外积的模长和以这两个向量为边的平行四边形的面积相等；
export function largestTriangleArea(points: number[][]): number {
  let max = 0
  const len = points.length
  for (let i = 0; i < len; i++) {
    for (let k = i + 1; k < len; k++) {
      for (let j = k + 1; j < len; j++) {
        const a = [points[j][0] - points[i][0], points[j][1] - points[i][1]]
        const b = [points[k][0] - points[i][0], points[k][1] - points[i][1]]
        max = Math.max(max, Math.abs(a[0] * b[1] - a[1] * b[0]) / 2)
      }
    }
  }

  return max
}
