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

function isValidBST(root: TreeNode | null): boolean {
  // 如果当前是搜索二叉树，那么左边必须要比根小，右边必须要比根大
  const dfs = (
    node: TreeNode | null,
    lower: number,
    upper: number
  ): boolean => {
    if (node === null) return true
    // 比较右边和左边
    if (node.val <= lower || node.val >= upper) {
      return false
    }

    return dfs(node.left, lower, node.val) && dfs(node.right, node.val, upper)
  }

  return dfs(root, -Infinity, Infinity)
}
