export function mySqrt(x: number): number {
  // 二分法寻找
  let left = 0,
    right = x,
    ans = -1
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)

    if (mid * mid <= x) {
      ans = mid
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return ans
}
