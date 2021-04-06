export function removeDuplicates(nums: number[]): number {
  const tem: number[] = []
  let curPoint = 0
  let t = 0

  for (let i = 0; i < nums.length; i++) {
    if (tem[tem.length - 1] === nums[i]) {
      curPoint += 1
    } else {
      curPoint = 0
    }

    if (curPoint < 2) {
      nums[t] = nums[i]
      t++
      tem.push(nums[i])
    }
  }

  return t
}
