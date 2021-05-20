export function topKFrequent(words: string[], k: number): string[] {
  const map: {
    [key: string]: number
  } = {}

  for (let i = 0; i < words.length; i++) {
    if (!map[words[i]]) {
      map[words[i]] = 0
    }

    map[words[i]] += 1
  }

  const sortedArray = Object.entries(map).sort((a, b) => {
    if (a[1] < b[1]) {
      return 1
    }

    if (a[1] > b[1]) {
      return -1
    }

    if (a[1] === b[1]) {
      if (a[0] < b[0]) {
        return -1
      } else {
        return 1
      }
    }

    return 0
  })

  return sortedArray.slice(0, k).reduce((acc: string[], cur) => {
    acc.push(cur[0])
    return acc
  }, [])
}
