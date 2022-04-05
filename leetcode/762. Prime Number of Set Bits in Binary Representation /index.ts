export function countPrimeSetBits(left: number, right: number): number {
  // 找出二进制中 1 的个数
  // https://leetcode-cn.com/problems/number-of-1-bits/
  const bitCounts = (x: number) => x.toString(2).split('0').join('').length

  // 是否是质数
  // https://leetcode-cn.com/problems/count-primes/
  const isPrime = (x: number) => {
    if (x < 2) return false

    for (let i = 2; i * i <= x; ++i) {
      if (x % i === 0) {
        return false
      }
    }
    return true
  }

  let ans = 0
  for (let i = left; i <= right; i++) {
    if (isPrime(bitCounts(i))) {
      ans++
    }
  }

  return ans
}
