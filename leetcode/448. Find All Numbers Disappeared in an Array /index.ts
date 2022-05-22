// https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/solution/zhao-dao-suo-you-shu-zu-zhong-xiao-shi-d-mabl/
// 这种无法做到空间是 O(1) 因此可以采用官方解答中的方法
export function findDisappearedNumbers(nums: number[]): number[] {
  const res = []

  let i = 1
  const set = new Set(nums)

  while (i <= nums.length) {
    if (!set.has(i)) {
      res.push(i)
    }
    i++
  }

  return res
}
