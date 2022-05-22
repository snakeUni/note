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

// https://leetcode.cn/problems/diameter-of-binary-tree/solution/er-cha-shu-de-zhi-jing-by-leetcode-solution/
function diameterOfBinaryTree(root: TreeNode | null): number {
  let max = 0
  const depth = (node: TreeNode | null) => {
    if (node === null) {
      return 0
    }

    const left: number = depth(node.left)
    const right: number = depth(node.right)
    max = Math.max(left + right, max)
    return Math.max(left, right) + 1
  }

  depth(root)
  return max
}
