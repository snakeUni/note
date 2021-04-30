export function singleNumber(nums: number[]): number {
  let a = 0,
    b = 0
  for (const num of nums) {
    const aNext = (~a & b & num) | (a & ~b & ~num),
      bNext = ~a & (b ^ num)
    a = aNext
    b = bNext
  }
  return b
}
