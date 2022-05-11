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

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  const list: number[] = []

  const postOrder = (root: TreeNode | null, list: number[]) => {
    if (!root) {
      return
    }
    postOrder(root.left, list)
    postOrder(root.right, list)
    list.push(root.val)
  }

  postOrder(root, list)
  const str = list.join(',')
  return str
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  if (data.length === 0) {
    return null
  }
  let arr = data.split(',')
  const length = arr.length
  const stack = []
  for (let i = 0; i < length; i++) {
    stack.push(parseInt(arr[i]))
  }

  const construct = (lower: number, upper: number, stack: number[]) => {
    if (
      stack.length === 0 ||
      stack[stack.length - 1] < lower ||
      stack[stack.length - 1] > upper
    ) {
      return null
    }
    const val = stack.pop()
    const root = new TreeNode(val)
    root.right = construct(val as number, upper, stack)
    root.left = construct(lower, val as number, stack)
    return root
  }

  return construct(-Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, stack)
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
