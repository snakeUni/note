export function nthUglyNumber(n: number): number {
  if (n === 1) return 1

  const dp = new Array(n + 1).fill(0)
  dp[1] = 1

  let p2 = 1,
    p3 = 1,
    p5 = 1
  for (let i = 2; i <= n; i++) {
    const num1 = dp[p2] * 2,
      num2 = dp[p3] * 3,
      num3 = dp[p5] * 5

    dp[i] = Math.min(Math.min(num1, num2), num3)

    if (dp[i] === num1) {
      p2++
    }

    if (dp[i] === num2) {
      p3++
    }

    if (dp[i] === num3) {
      p5++
    }
  }

  return dp[n]
}
