// 会超出时间限制
export function countPrimes(n: number): number {
  if (n <= 2) {
    return 0
  }

  if (n < 3) {
    return 1
  }

  const ans = [2]

  // 因为质数只能被 1 和其本身整数，因此其他的数如果不是质数，那么一定是质数的倍数。
  for (let i = 3; i < n; i++) {
    if (i % 2 === 0) {
      // 如果是偶数，肯定不是
      continue
    }

    let flag = true
    for (let k = 0; k < ans.length; k++) {
      // 只要被整数就不是质数
      if (i % ans[k] === 0) {
        flag = false
        break
      }
    }
    if (flag) {
      ans.push(i)
    }
  }

  return ans.length
}

/**
 * https://leetcode-cn.com/problems/count-primes/solution/ji-shu-zhi-shu-by-leetcode-solution/
 * @param n
 * @returns
 */
export function countPrimes2(n: number): number {
  const isPrime = (x: number) => {
    for (let i = 2; i * i <= x; ++i) {
      if (x % i == 0) {
        return false
      }
    }
    return true
  }

  let ans = 0
  for (let i = 2; i < n; ++i) {
    ans += isPrime(i) ? 1 : 0
  }
  return ans
}
