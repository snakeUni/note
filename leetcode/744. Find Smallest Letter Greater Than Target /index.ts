export function nextGreatestLetter(letters: string[], target: string): string {
  if (target === 'z') return letters[0]
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] > target) {
      return letters[i]
    }
  }
  return letters[0]
}

// 二分查找
export function nextGreatestLetter2(letters: string[], target: string): string {
  const length = letters.length
  if (target >= letters[length - 1]) {
    return letters[0]
  }
  let low = 0,
    high = length - 1
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low
    if (letters[mid] > target) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  return letters[low]
}
