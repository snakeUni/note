export function decodeString(s: string): string {
  let res = ''
  let multi = 0
  const stackMulti: number[] = []
  const stackRes = []

  for (let i = 0; i < s.length; i++) {
    const cur = s[i]

    if (cur === '[') {
      stackMulti.push(multi)
      stackRes.push(res)
      multi = 0
      res = ''
    } else if (cur === ']') {
      let tmp = ''
      let curMulti = stackMulti.pop() as number

      for (let i = 0; i < curMulti; i++) {
        tmp += res
      }

      res = stackRes.pop() + tmp
    } else if (cur >= '0' && cur <= '9') {
      multi = multi * 10 + Number(cur)
    } else {
      res += cur
    }
  }

  return res
}
