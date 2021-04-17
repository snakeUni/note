export function containsNearbyAlmostDuplicate(
  nums: number[],
  k: number,
  t: number
): boolean {
  const length = nums.length
  for (let i = 0; i < length; i++) {
    let canUseMaxIndex = i + k + 1
    canUseMaxIndex = canUseMaxIndex > length - 1 ? length : canUseMaxIndex
    const canUseNums = nums.slice(i, canUseMaxIndex)

    for (let k = 1; k < canUseNums.length; k++) {
      if (Math.abs(canUseNums[k] - canUseNums[0]) <= t) {
        return true
      }
      continue
    }
  }

  return false
}
