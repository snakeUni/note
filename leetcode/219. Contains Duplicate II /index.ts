export function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const cur = map.get(nums[i])
    if (cur || cur === 0) {
      console.log('cur', cur)
      if (Math.abs(i - cur) <= k) {
        return true
      } else {
        map.set(nums[i], i)
      }
    } else {
      map.set(nums[i], i)
    }
  }

  return false
}
