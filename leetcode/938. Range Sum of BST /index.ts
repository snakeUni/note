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

function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  if (!root) return 0
  const rootVal = root.val
  // 因为二叉搜索树，因此肯定是排好序的
  let total = 0

  const inOrder = (node: TreeNode | null) => {
    if (!node) {
      return
    }

    inOrder(node.left)
    if (low <= node.val && node.val <= high) {
      total += node.val
    }
    inOrder(node.right)
  }

  if (rootVal > high) {
    // 遍历左边
    inOrder(root.left)
  } else if (rootVal < low) {
    inOrder(root.right)
  } else {
    inOrder(root)
  }

  return total
}
