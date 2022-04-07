// 循环的暴力解法了
export function rotateString(s: string, goal: string): boolean {
  if (s === goal) return true
  let nextS = s
  for (let i = 0; i < s.length; i++) {
    nextS = `${nextS.slice(1)}${s[i]}`

    if (nextS === goal) {
      return true
    }
  }

  return false
}

export function rotateString2(s: string, goal: string) {
  // 如果反转相同，那么必然存在两个一模一样的段,那么字符串 s + s 必然包含了 goal
  return s.length === goal.length && (s + s).includes(goal)
}
