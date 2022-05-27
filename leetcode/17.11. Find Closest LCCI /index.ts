export function findClosest(
  words: string[],
  word1: string,
  word2: string
): number {
  // 单词循环也能做到
  let tem = []
  let min = 100000
  let k = 0

  for (let i = 0; i < words.length; i++) {
    if (words[i] !== word1 && words[i] !== word2) {
      continue
    } else {
      const last = tem.pop()
      if (last) {
        if (last === words[i]) {
          tem.push(words[i])
          k = i
        } else {
          min = Math.min(min, i - k)
          tem.push(words[i])
          k = i
        }
      } else {
        tem.push(words[i])
        k = i
      }
    }
  }

  return min
}
