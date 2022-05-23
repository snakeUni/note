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

function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null
): TreeNode | null {
  if (root1 == null) {
    return root2
  }
  if (root2 == null) {
    return root1
  }
  const merged = new TreeNode(root1.val + root2.val)
  merged.left = mergeTrees(root1.left, root2.left)
  merged.right = mergeTrees(root1.right, root2.right)
  return merged
}
