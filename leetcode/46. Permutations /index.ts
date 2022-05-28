// https://leetcode.cn/problems/permutations/solution/quan-pai-lie-by-leetcode-solution-2/
export function permute(nums: number[]): number[][] {
  const swap = (output: number[], index1: number, index2: number) => {
    const tem = output[index1]
    output[index1] = output[index2]
    output[index2] = tem
  }

  const backtrack = (
    n: number,
    output: number[],
    res: number[][],
    first: number
  ) => {
    if (first === n) {
      res.push([...output])
    }

    for (let i = first; i < n; i++) {
      swap(output, first, i)
      backtrack(n, output, res, first + 1)
      swap(output, first, i)
    }
  }

  const res: number[][] = []
  const output: number[] = []

  nums.forEach((num, index) => {
    output[index] = num
  })

  let n = nums.length
  backtrack(n, output, res, 0)
  return res
}
