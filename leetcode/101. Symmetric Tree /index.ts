/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
// https://leetcode.cn/problems/symmetric-tree/solution/dui-cheng-er-cha-shu-by-leetcode-solution/
function isSymmetric(root: TreeNode | null): boolean {
  const check = (p: TreeNode | null, q: TreeNode | null): boolean => {
    if (!p && !q) return true
    if (!p || !q) return false
    return p.val === q.val && check(p.left, q.right) && check(p.right, q.left)
  }

  return check(root, root)
}

// 迭代方法
// https://leetcode.cn/problems/symmetric-tree/solution/dui-cheng-er-cha-shu-by-leetcode-solution/
function isSymmetric2(root: TreeNode | null): boolean {
  const check = (u: TreeNode | null, v: TreeNode | null): boolean => {
    const q: (TreeNode | null)[] = []
    q.push(u), q.push(v)

    while (q.length) {
      u = q.shift()!
      v = q.shift()!

      if (!u && !v) continue
      if (!u || !v || u.val !== v.val) return false

      q.push(u.left)
      q.push(v.right)

      q.push(u.right)
      q.push(v.left)
    }
    return true
  }

  return check(root, root)
}
