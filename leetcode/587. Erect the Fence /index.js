// https://leetcode-cn.com/problems/erect-the-fence/solution/an-zhuang-zha-lan-by-leetcode-solution-75s3/
// 太难了。放弃
var outerTrees = function (trees) {
  const n = trees.length
  if (n < 4) {
    return trees
  }
  let leftMost = 0
  for (let i = 0; i < n; i++) {
    if (trees[i][0] < trees[leftMost][0]) {
      leftMost = i
    }
  }

  const res = []
  const visit = new Array(n).fill(0)
  let p = leftMost
  do {
    let q = (p + 1) % n
    for (let r = 0; r < n; r++) {
      /* 如果 r 在 pq 的右侧，则 q = r */
      if (cross(trees[p], trees[q], trees[r]) < 0) {
        q = r
      }
    }
    /* 是否存在点 i, 使得 p 、q 、i 在同一条直线上 */
    for (let i = 0; i < n; i++) {
      if (visit[i] || i === p || i === q) {
        continue
      }
      if (cross(trees[p], trees[q], trees[i]) === 0) {
        res.push(trees[i])
        visit[i] = true
      }
    }
    if (!visit[q]) {
      res.push(trees[q])
      visit[q] = true
    }
    p = q
  } while (p !== leftMost)
  return res
}

const cross = (p, q, r) => {
  return (q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0])
}
