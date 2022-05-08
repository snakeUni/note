export function findDuplicates(nums: number[]): number[] {
  const duplicateArray: number[] = []

  const map = new Map()

  nums.forEach(n => {
    if (map.has(n)) {
      duplicateArray.push(n)
    } else {
      map.set(n, 1)
    }
  })

  return duplicateArray
}
