// https://leetcode.cn/problems/generate-parentheses/solution/gua-hao-sheng-cheng-by-leetcode-solution/
export function generateParenthesis(n: number): string[] {
  const res: string[] = []
  const generateThesis = (s: string, left: number, right: number) => {
    if (left === 0 && right === 0) {
      res.push(s)
      return
    }

    if (left === right) {
      //剩余左右括号数相等，下一个只能用左括号
      generateThesis(s + '(', left - 1, right)
    } else if (left < right) {
      //剩余左括号小于右括号，下一个可以用左括号也可以用右括号
      if (left > 0) {
        generateThesis(s + '(', left - 1, right)
      }
      generateThesis(s + ')', left, right - 1)
    }
  }

  if (n <= 0) return res
  generateThesis('', n, n)
  return res
}
