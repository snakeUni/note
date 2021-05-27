export function hammingDistance(x: number, y: number): number {
  const v2 = (x ^ y).toString(2)
  let t = 0
  for (let i = 0; i < v2.length; i++) {
    if (v2[i] === '1') t += 1
  }

  return t
}
