export function lengthOfLongestSubstring(s: string): number {
  // 我的写法，时间比较长
  let length = 0
  const find = (strArray: string) => {
    const result: string[] = []
    for (let i = 0; i < strArray.length; i++) {
      const v = strArray[i]
      if (!result.includes(v)) {
        result.push(v)
      } else {
        const resLength = result.length
        length = Math.max(length, resLength)
        find(strArray.slice(result.indexOf(v) + 1))
        break
      }
    }
    length = Math.max(length, result.length)
  }

  find(s)
  return length
}

// 官方写法
export function lengthOfLongestSubstring2(s: string): number {
  let maxLength = 0,
    point = -1
  const hashSet = new Set()
  for (let i = 0; i < s.length; i++) {
    if (i !== 0) {
      hashSet.delete(s.charAt(i - 1))
    }

    while (point + 1 < s.length && !hashSet.has(s.charAt(point + 1))) {
      hashSet.add(s.charAt(point + 1))
      ++point
    }
    maxLength = Math.max(maxLength, point - i + 1)
  }

  return maxLength
}
