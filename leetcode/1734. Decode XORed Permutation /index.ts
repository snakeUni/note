export function decode(encoded: number[]): number[] {
  const n = encoded.length + 1
  let total = 0
  for (let i = 1; i <= n; i++) {
    total ^= i
  }
  let odd = 0
  for (let i = 1; i < n - 1; i += 2) {
    odd ^= encoded[i]
  }
  const perm = new Array(n).fill(0)
  perm[0] = total ^ odd
  for (let i = 0; i < n - 1; i++) {
    perm[i + 1] = perm[i] ^ encoded[i]
  }
  return perm
}
