export function isAlienSorted(words: string[], order: string): boolean {
  // order 空间换时间
  const orderMap = new Map()
  for (let i = 0; i < order.length; i++) {
    orderMap.set(order[i], i)
  }

  for (let i = 1; i < words.length; i++) {
    const preWord = words[i - 1]
    const curWord = words[i]

    const maxLength = Math.max(preWord.length, curWord.length)

    for (let k = 0; k < maxLength; k++) {
      if (preWord[k] === curWord[k]) {
        continue
      } else {
        if (preWord[k] && curWord[k]) {
          if (orderMap.get(preWord[k]) < orderMap.get(curWord[k])) {
            break
          } else {
            return false
          }
        } else if (preWord[k] && !curWord[k]) {
          return false
        } else if (!preWord[k] && curWord[k]) {
          continue
        } else {
          return false
        }
      }
    }
  }

  return true
}
