class TreeNode {
  val: number
  children: TreeNode[]
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val
    this.children = []
  }
}

// 层序遍历类似广度遍历，队列结构
/**
 * 具体地，我们首先把根节点 root 放入队列中，随后在广度优先搜索的每一轮中，我们首先记录下当前队列中包含的节点个数（记为 cnt），即表示上一层的节点个数。在这之后，我们从队列中依次取出节点，直到取出了上一层的全部 cnt 个节点为止。当取出节点 cur 时，我们将 cur 的值放入一个临时列表，再将 cur 的所有子节点全部放入队列中。

当这一轮遍历完成后，临时列表中就存放了当前层所有节点的值。这样一来，当整个广度优先搜索完成后，我们就可以得到层序遍历的结果。
 * @param root 
 * @returns 
 */
export function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []

  const queue = [root]
  const ans = []

  // 初始化第一行
  while (queue.length > 0) {
    const cnt = queue.length
    const level: any[] = []
    for (let i = 0; i < cnt; i++) {
      // 总是取出第一个
      const v = queue.shift() as TreeNode
      level.push(v.val)
      for (let k of v.children) {
        queue.push(k)
      }
    }
    ans.push(level)
  }

  return ans
}
