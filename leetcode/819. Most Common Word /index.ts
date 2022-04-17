export function mostCommonWord(paragraph: string, banned: string[]): string {
  const lowCaseArray = paragraph
    .toLowerCase()
    .replace(/[!?'.,;]/g, ' ')
    .split(' ')
  const map = new Map()
  let max = 0,
    maxKey = ''
  for (let i = 0; i < lowCaseArray.length; i++) {
    const cur = lowCaseArray[i].trim()
    if (cur) {
      if (banned.includes(cur)) {
        continue
      } else {
        map.set(cur, (map.get(cur) || 0) + 1)
        max = Math.max(max, (map.get(cur) || 0) + 1)
        if ((map.get(cur) || 0) + 1 >= max) {
          maxKey = cur
        }
      }
    }
  }

  return maxKey
}
