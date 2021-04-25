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

function increasingBST(root: TreeNode | null): TreeNode | null {
  const inorder = (node: TreeNode | null, res: number[]) => {
    if (!node) {
      return
    }
    inorder(node.left, res)
    res.push(node.val)
    inorder(node.right, res)
  }

  const res: number[] = []
  inorder(root, res)

  const dummyNode = new TreeNode(-1)
  let currNode = dummyNode
  for (const value of res) {
    currNode.right = new TreeNode(value)
    currNode = currNode.right
  }
  return dummyNode.right
}
