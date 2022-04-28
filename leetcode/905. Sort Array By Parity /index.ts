export function sortArrayByParity(nums: number[]): number[] {
  const even: number[] = []
  const old: number[] = []
  nums.forEach(n => {
    if (n % 2 === 0) {
      old.push(n)
    } else {
      even.push(n)
    }
  })

  return old.concat(even)
}
