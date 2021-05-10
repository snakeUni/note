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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const leftV: number[] = []
  const rightV: number[] = []

  if (root1 === null && root2 === null) return true
  if ((root1 === null && root2 !== null) || (root1 !== null && root2 === null))
    return false

  const tree = (node: TreeNode | null, collection: number[]) => {
    if (node === null) {
      return
    }

    tree(node.left, collection)
    if (node.left === null && node.right === null) {
      collection.push(node.val)
    }
    tree(node.right, collection)
  }

  tree(root1, leftV)
  tree(root2, rightV)

  if (leftV.length !== rightV.length) return false

  for (let i = 0; i < leftV.length; i++) {
    if (leftV[i] !== rightV[i]) {
      return false
    }
  }

  return true
}
