export function findMin(nums: number[]): number {
  // 允许重复的话，不如先去重
  const newNums = [...new Set(nums)]
  if (newNums[0] > newNums[newNums.length - 1]) {
    // 从右边遍历
    for (let i = newNums.length - 1; i >= 1; i--) {
      if (newNums[i - 1] > newNums[i]) return newNums[i]
    }
  } else {
    return newNums[0]
  }

  return newNums[0]
}
