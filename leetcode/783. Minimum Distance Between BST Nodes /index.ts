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

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

export function minDiffInBST(root: TreeNode | null): number {
  // 根据二叉搜索树的特别，任意两个节点之间的最小值，一定是相邻的节点
  // 否则后面的节点一定比前面大, 只需要中序遍历即可
  let ans = Number.MAX_SAFE_INTEGER,
    pre = -1
  const dfs = (root: TreeNode | null) => {
    if (root === null) {
      return
    }

    dfs(root.left)

    if (pre == -1) {
      pre = root.val
    } else {
      ans = Math.min(ans, root.val - pre)
      pre = root.val
    }

    dfs(root.right)
  }
  dfs(root)
  return ans
}
