export function decode(encoded: number[], first: number): number[] {
  const n = encoded.length + 1
  const arr = new Array(n).fill(0)
  arr[0] = first
  for (let i = 1; i < n; i++) {
    arr[i] = arr[i - 1] ^ encoded[i - 1]
  }
  return arr
}
