export function isScramble(s1: string, s2: string): boolean {
  if (s1.length === 1) return s1 === s2

  // 先找出第一个 s2 的第一个元素就可以找出切断的点,但是有可能会重复，因此
  // 只要满足就直接返回，否则一直找到 index === lastIndex
  const first = s2[0]
  let index = s1.indexOf(first)
  const lastIndex = s1.lastIndexOf(first)

  while (index !== lastIndex) {
    const originLeft = s1.slice(0, index + 1)
    const targetLeft = s2.slice(0, index + 1)

    for (let i = 0; i < originLeft.length; i++) {
      if (!targetLeft.includes(originLeft[i])) {
        break
      }
    }

    let nextIndex = s1.slice(index + 1).indexOf(first)

    index = index + nextIndex + 1
  }

  if (index === lastIndex) {
    const originLeft = s1.slice(0, index + 1)
    const targetLeft = s2.slice(0, index + 1)
    const originRight = s1.slice(index + 1)
    const targetRight = s2.slice(index + 1)

    // 比较左边
    for (let i = 0; i < originLeft.length; i++) {
      if (!targetLeft.includes(originLeft[i])) {
        return false
      }
    }

    for (let i = 0; i < originRight.length; i++) {
      if (!targetRight.includes(originRight[i])) {
        return false
      }
    }
  }

  return true
}
