export function trap(height: number[]): number {
  // 动态规划，需要遍历两次，否则遇到 W 模型就会过不去。
  // W 模型即是 [5, 0, 2, 0, 2, 5]
  const n = height.length
  if (n == 0) {
    return 0
  }

  const leftMax = new Array(n).fill(0)
  leftMax[0] = height[0]
  for (let i = 1; i < n; ++i) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i])
  }

  const rightMax = new Array(n).fill(0)
  rightMax[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; --i) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i])
  }

  let ans = 0
  for (let i = 0; i < n; ++i) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i]
  }

  console.log('leftMax:', leftMax)
  console.log('rightMax:', rightMax)
  return ans
}

// 使用双指针
export function trapPoint(height: number[]): number {
  let leftPoint = 0,
    rightPoint = height.length - 1
  let leftMax = 0
  let rightMax = 0
  let total = 0

  while (leftPoint < rightPoint) {
    leftMax = Math.max(leftMax, height[leftPoint])
    rightMax = Math.max(rightMax, height[rightPoint])

    if (leftMax < rightMax) {
      total += leftMax - height[leftPoint]
      leftPoint += 1
    } else {
      total += rightMax - height[rightPoint]
      rightPoint -= 1
    }
  }

  return total
}
