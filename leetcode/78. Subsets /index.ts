// https://leetcode.cn/problems/subsets/solution/zi-ji-by-leetcode-solution/
// 回溯算法
export function subsets(nums: number[]): number[][] {
  const t: number[] = []
  const ans: number[][] = []
  const dfs = (cur: number) => {
    if (cur === nums.length) {
      ans.push(t.slice())
      return
    }
    t.push(nums[cur])
    dfs(cur + 1)
    t.pop()
    dfs(cur + 1)
  }
  dfs(0)
  return ans
}
