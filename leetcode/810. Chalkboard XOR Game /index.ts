export function xorGame(nums: number[]): boolean {
  if (nums.length % 2 == 0) {
    return true
  }
  let xor = 0
  for (const num of nums) {
    xor ^= num
  }
  return xor == 0
}
