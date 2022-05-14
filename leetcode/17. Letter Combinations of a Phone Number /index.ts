// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/solution/hui-su-dui-lie-tu-jie-by-ml-zimingmeng/
// 队列的解法蛮有意思的
export function letterCombinations(digits: string): string[] {
  // 因为 digits 的长度是 4，因此最多需要 4 次循环
  const phoneMap = new Map([
    ['2', 'abc'],
    ['3', 'def'],
    ['4', 'ghi'],
    ['5', 'jkl'],
    ['6', 'mno'],
    ['7', 'pqrs'],
    ['8', 'tuv'],
    ['9', 'wxyz']
  ])

  const len = digits.length
  const res: string[] = []

  if (len === 0) return []
  if (len === 1) return phoneMap.get(digits[0])!.split('')
  if (len === 2) {
    const first = phoneMap.get(digits[0]) as string
    const second = phoneMap.get(digits[1]) as string
    for (let i = 0; i < first.length; i++) {
      for (let k = 0; k < second.length; k++) {
        res.push(`${first[i]}${second[k]}`)
      }
    }

    return res
  }
  if (len === 3) {
    const first = phoneMap.get(digits[0]) as string
    const second = phoneMap.get(digits[1]) as string
    const third = phoneMap.get(digits[2]) as string
    for (let i = 0; i < first.length; i++) {
      for (let k = 0; k < second.length; k++) {
        for (let j = 0; j < third.length; j++) {
          res.push(`${first[i]}${second[k]}${third[j]}`)
        }
      }
    }

    return res
  }

  if (len === 4) {
    const first = phoneMap.get(digits[0]) as string
    const second = phoneMap.get(digits[1]) as string
    const third = phoneMap.get(digits[2]) as string
    const four = phoneMap.get(digits[3]) as string
    for (let i = 0; i < first.length; i++) {
      for (let k = 0; k < second.length; k++) {
        for (let j = 0; j < third.length; j++) {
          for (let m = 0; m < four.length; m++) {
            res.push(`${first[i]}${second[k]}${third[j]}${four[m]}`)
          }
        }
      }
    }

    return res
  }

  return res
}
