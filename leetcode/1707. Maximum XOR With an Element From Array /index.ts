export function maximizeXor(nums: number[], queries: number[][]): number[] {
  const answers = []
  const sortedNums = nums.sort((a, b) => (a - b < 0 ? -1 : 1))

  for (let i = 0; i < queries.length; i++) {
    const xi = queries[i][0]
    const mi = queries[i][1]
    let max = -1

    for (let k = 0; k < sortedNums.length; k++) {
      const cur = sortedNums[k]
      if (cur <= mi) {
        max = Math.max(max, cur ^ xi)
      } else {
        answers.push(max)
        break
      }

      if (k === sortedNums.length - 1) {
        answers.push(max)
      }
    }
  }

  return answers
}
