export function romanToInt(s: string): number {
  const RomanNum: any = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000
  }

  let num = 0
  let index = 0

  while (index < s.length) {
    const v = s.slice(index, index + 2)
    if (RomanNum[v]) {
      num += RomanNum[v]
      index += 2
    } else {
      num += RomanNum[s[index]]
      index += 1
    }
  }

  return num
}
