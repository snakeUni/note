export function xorOperation(n: number, start: number): number {
  let res = 0
  let index = 0
  while (index < n) {
    res = res ^ (start + 2 * index)
    index++
  }

  return res
}
