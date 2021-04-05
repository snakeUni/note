export function reverse(x: number): number {
  if (x === 0) return 0

  const newX = x > 0 ? `${x}` : `${x}`.slice(1)

  const res = Number(newX.split('').reverse().join(''))

  const withRes = x > 0 ? res : -res

  if (-Math.pow(2, 31) <= withRes && withRes <= Math.pow(2, 31) - 1) {
    return withRes
  }

  return 0
}
