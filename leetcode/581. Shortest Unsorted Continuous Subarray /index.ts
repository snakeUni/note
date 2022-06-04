export function findUnsortedSubarray(nums: number[]): number {
  const isSorted = (nums: number[]) => {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) {
        return false
      }
    }
    return true
  }

  if (isSorted(nums)) return 0

  // 最简单的方法就是排序数组找到不同的地方
  const sortedNums = [...nums].sort((a, b) => a - b)
  let left = 0,
    right = nums.length - 1

  while (nums[left] === sortedNums[left]) {
    left++
  }

  while (nums[right] === sortedNums[right]) {
    right--
  }

  return right - left + 1
}

// 一次遍历，从左往右，找到比左边最大值还小的最右下标，从右往左，找到比右边最小值还大的最左下标
export function findUnsortedSubarray2(nums: number[]): number {
  // 最简单的方法就是排序数组找到不同的地方
  const n = nums.length
  let max = -Number.MAX_VALUE,
    right = -1
  let min = Number.MAX_VALUE,
    left = -1

  for (let i = 0; i < nums.length; i++) {
    if (max > nums[i]) {
      right = i
    } else {
      max = nums[i]
    }

    if (min < nums[n - i - 1]) {
      left = n - i - 1
    } else {
      min = nums[n - i - 1]
    }
  }

  return right === -1 ? 0 : right - left + 1
}
