/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
// 中序遍历
var inorderSuccessor = function (root, p) {
  const stack = []
  let pre = null,
    cur = root

  while (stack.length || cur) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }

    cur = stack.pop()

    if (pre === p) {
      return cur
    }

    pre = cur
    cur = cur.right
  }

  return null
}

// 二叉搜索树，因此中序遍历下是递增的
var inorderSuccessor2 = function (root, p) {
  let successor = null

  if (p.right) {
    successor = p.right

    while (successor.left) {
      successor = successor.left
    }

    return successor
  }

  let node = root

  while (node) {
    if (node.val > p.val) {
      successor = node
      node = node.left
    } else {
      node = node.right
    }
  }

  return successor
}
