function maxSumSubmatrix(matrix: number[][], k: number): number {
  // 题解 https://leetcode-cn.com/problems/max-sum-of-rectangle-no-larger-than-k/solution/ju-xing-qu-yu-bu-chao-guo-k-de-zui-da-sh-70q2/
  let row = matrix.length // 行
  let column = matrix[0].length // 列
  let b = Array.from({ length: column }, () => 0) // 存储每列之和
  let res = -Number.MAX_VALUE
  for (let i = 0; i < row; i++) {
    // 遍历开始行
    for (let t = 0; t < b.length; t++) b[t] = 0 // 开始行改变之后需要把每列之和置零
    for (let j = i; j < row; j++) {
      for (let k = 0; k < column; k++) b[k] += matrix[j][k]
      // 把所有可能遍历出来
      for (let m = 0; m < b.length; m++) {
        let sum = 0
        for (let n = m; n < b.length; n++) {
          sum += b[n]
          if (sum <= k && sum > res) {
            // 只有小于max，且大于之前的值
            res = sum
          }
        }
      }
    }
  }
  return res
}
