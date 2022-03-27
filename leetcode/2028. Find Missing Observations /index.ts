export function missingRolls(
  rolls: number[],
  mean: number,
  n: number
): number[] {
  // 获取 Sn
  const Sn =
    mean * (rolls.length + n) - rolls.reduce((acc, cur) => acc + cur, 0)
  console.log('Sn:', Sn)
  // 因为每个面最大是 6 因此
  if (Sn > n * 6 || Sn < 0) return []
  // 如果只有一个
  if (n === 1) return [Sn]
  // 算出每项最小的值
  const min = Math.floor(Sn / n)
  console.log('min:', min)
  const remain = Sn % (min * n)
  console.log('remain:', remain)
  if (min === 0) {
    return []
  } else if (min === 6) {
    return new Array(n).fill(6)
  } else {
    return new Array(n - remain)
      .fill(min)
      .concat(new Array(remain).fill(min + 1))
  }
}
