export function diStringMatch(s: string): number[] {
  // min 和 max 为剩下的最小和最大值
  let n = s.length,
    min = 0,
    max = n
  const perm = new Array(n + 1).fill(0)

  for (let i = 0; i < n; i++) {
    perm[i] = s[i] === 'I' ? min++ : max--
  }
  // 最后一个数字 min = max
  perm[n] = min

  return perm
}
