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

function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  // x 的信息
  let x_parent = null,
    x_depth = null,
    x_found = false
  // y 的信息
  let y_parent = null,
    y_depth = null,
    y_found = false

  const dfs = (
    node: TreeNode | null,
    depth: number,
    parent: TreeNode | null
  ) => {
    if (!node) {
      return
    }
    if (node.val === x) {
      ;[x_parent, x_depth, x_found] = [parent, depth, true]
    } else if (node.val === y) {
      ;[y_parent, y_depth, y_found] = [parent, depth, true]
    }

    // 如果两个节点都找到了，就可以提前退出遍历
    // 即使不提前退出，对最坏情况下的时间复杂度也不会有影响
    if (x_found && y_found) {
      return
    }

    dfs(node.left, depth + 1, node)

    if (x_found && y_found) {
      return
    }

    dfs(node.right, depth + 1, node)
  }
  dfs(root, 0, null)
  return x_depth === y_depth && x_parent !== y_parent
}
