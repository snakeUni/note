// 动态规划
export function numSquares(n: number): number {
  const f = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    let minn = Number.MAX_VALUE
    for (let j = 1; j * j <= i; j++) {
      minn = Math.min(minn, f[i - j * j])
    }
    f[i] = minn + 1
  }
  return f[n]
}

// https://leetcode.cn/problems/perfect-squares/solution/wan-quan-ping-fang-shu-by-leetcode-solut-t99c/
export function numSquares2(n: number): number {
  // 判断是否为完全平方数
  const isPerfectSquare = (x: number) => {
    const y = Math.floor(Math.sqrt(x))
    return y * y == x
  }

  // 判断是否能表示为 4^k*(8m+7)
  const checkAnswer4 = (x: number) => {
    while (x % 4 == 0) {
      x /= 4
    }
    return x % 8 == 7
  }
  if (isPerfectSquare(n)) {
    return 1
  }
  if (checkAnswer4(n)) {
    return 4
  }
  for (let i = 1; i * i <= n; i++) {
    let j = n - i * i
    if (isPerfectSquare(j)) {
      return 2
    }
  }
  return 3
}
