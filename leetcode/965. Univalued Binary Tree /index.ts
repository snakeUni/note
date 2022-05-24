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

function isUnivalTree(root: TreeNode | null): boolean {
  if (!root) {
    return true
  }
  if (root.left) {
    if (root.val !== root.left.val || !isUnivalTree(root.left)) {
      return false
    }
  }
  if (root.right) {
    if (root.val !== root.right.val || !isUnivalTree(root.right)) {
      return false
    }
  }
  return true
}
