// https://leetcode-cn.com/problems/longest-absolute-file-path/solution/by-ac_oier-c55t/
export function lengthLongestPath(input: string): number {
  const hash = new Array(10010).fill(-1)
  let n = input.length,
    ans = 0

  for (let i = 0; i < n; ) {
    let level = 0
    while (i < n && input.charAt(i) == '\t' && ++level >= 0) i++
    let j = i
    let isDir = true
    while (j < n && input.charAt(j) != '\n') {
      if (input.charAt(j++) == '.') isDir = false
    }
    let cur = j - i
    let prev = level - 1 >= 0 ? hash[level - 1] : -1
    let path = prev + 1 + cur
    if (isDir) hash[level] = path
    else if (path > ans) ans = path
    i = j + 1
  }
  return ans
}
