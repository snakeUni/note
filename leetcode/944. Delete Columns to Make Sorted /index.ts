export function minDeletionSize(strs: string[]): number {
  const row = strs.length
  const col = strs[0].length
  let ans = 0
  for (let j = 0; j < col; ++j) {
    for (let i = 1; i < row; ++i) {
      if (strs[i - 1][j] > strs[i][j]) {
        ans++
        break
      }
    }
  }
  return ans
}
