export function shipWithinDays(weights: number[], D: number): number {
  // 使用二分查找，因为最小的运送也必须比最重的包裹要种，最大肯定不会超过所有包括之和
  // 根据包裹的重量进行查找，如果当前包裹的和比设置的最低运送大，就放在右边执行
  let left = Math.max(...weights)
  let right = weights.reduce((a, b) => a + b)

  while (left < right) {
    // needDay 为需要的天数，cur 为当前的值的和
    let needDay = 1,
      cur = 0,
      middle = Math.floor((left + right) / 2)

    for (let i = 0; i < weights.length; i++) {
      if (cur + weights[i] > middle) {
        needDay++
        cur = 0
      }
      cur += weights[i]
    }

    if (needDay < D) {
      right = middle
    } else {
      left = middle
    }
  }

  return left
}
