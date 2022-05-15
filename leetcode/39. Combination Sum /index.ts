// 回溯 https://leetcode.cn/problems/combination-sum/solution/zu-he-zong-he-by-leetcode-solution/
export function combinationSum(
  candidates: number[],
  target: number
): number[][] {
  const res: number[][] = []
  let idx = 0

  const dfs = (target: number, combination: number[], idx: number) => {
    if (idx === candidates.length) {
      return
    }

    if (target === 0) {
      res.push(combination)
      return
    }
    // 直接跳过
    dfs(target, combination, idx + 1)

    if (target - candidates[idx] >= 0) {
      dfs(target - candidates[idx], [...combination, candidates[idx]], idx)
    }
  }

  dfs(target, [], idx)

  return res
}
