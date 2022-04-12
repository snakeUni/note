export function numberOfLines(widths: number[], s: string): number[] {
  // a 第 0 个。其他的 charCodeAt() - 'a'.charCodeAt() 就是对应的下标
  let result = [0, 0]
  let max = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'a') {
      max += widths[0]
    } else {
      max += widths[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]
    }
    if (max > 100) {
      result[0]++
      max = widths[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]
    }
  }

  result[0]++
  result[1] = max

  return result
}
