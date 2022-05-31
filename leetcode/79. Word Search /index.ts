// https://leetcode.cn/problems/word-search/solution/dan-ci-sou-suo-by-leetcode-solution/
export function exist(board: string[][], word: string): boolean {
  const h = board.length,
    w = board[0].length
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ]
  const visited: boolean[][] = new Array(h)
  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(w).fill(false)
  }

  const check = (i: number, j: number, s: string, k: number) => {
    if (board[i][j] !== s.charAt(k)) {
      return false
    } else if (k === s.length - 1) {
      return true
    }
    visited[i][j] = true
    let res = false
    for (const [dx, dy] of directions) {
      let newi = i + dx,
        newj = j + dy

      if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
        if (!visited[newi][newj]) {
          const flag = check(newi, newj, s, k + 1)
          if (flag) {
            res = true
            break
          }
        }
      }
    }
    visited[i][j] = false
    return res
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const flag = check(i, j, word, 0)

      if (flag) return true
    }
  }

  return false
}
