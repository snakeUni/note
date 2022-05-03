export function reorderLogFiles(logs: string[]): string[] {
  const logCompare = (log1: [string, number], log2: [string, number]) => {
    const split1 = split(log1[0], ' ')
    const split2 = split(log2[0], ' ')
    const isDigit1 = isDigit(split1[1][0])
    const isDigit2 = isDigit(split2[1][0])
    if (isDigit1 && isDigit2) {
      return log1[1] - log2[1]
    }
    if (!isDigit1 && !isDigit2) {
      const sc = compareTo(split1[1], split2[1])
      if (sc !== 0) {
        return sc
      }
      return compareTo(split1[0], split2[0])
    }
    return isDigit1 ? 1 : -1
  }

  const isDigit = (ch: string) => {
    return parseFloat(ch).toString() === 'NaN' ? false : true
  }

  const compareTo = (left: string, right: string) => {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      if (left[i].charCodeAt(0) < right[i].charCodeAt(0)) {
        return -1
      }
      if (left[i].charCodeAt(0) > right[i].charCodeAt(0)) {
        return 1
      }
    }
    if (left.length === right.length) {
      return 0
    }
    if (left.length > right.length) {
      return 1
    }
    return -1
  }

  const split = (str: string, separator: string) => {
    const firstItem = str.split(separator)[0]
    const ret = [firstItem]
    const index = str.indexOf(' ')
    ret.push(str.slice(index + 1, str.length))
    return ret
  }

  const length = logs.length
  const arr = new Array(length).fill(0)
  for (let i = 0; i < length; i++) {
    arr[i] = [logs[i], i]
  }

  arr.sort((a, b) => logCompare(a, b))
  const reordered = new Array(length).fill(0)
  for (let i = 0; i < length; i++) {
    reordered[i] = arr[i][0]
  }

  return reordered
}
