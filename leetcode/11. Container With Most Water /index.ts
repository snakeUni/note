// https://leetcode.cn/problems/container-with-most-water/solution/sheng-zui-duo-shui-de-rong-qi-by-leetcode-solution/
export function maxArea(height: number[]): number {
  let l = 0,
    r = height.length - 1,
    ans = 0

  while (l <= r) {
    const leftH = height[l]
    const rightH = height[r]
    ans = Math.max(ans, Math.min(leftH, rightH) * (r - l))
    if (leftH < rightH) {
      l++
    } else {
      r--
    }
  }

  return ans
}
