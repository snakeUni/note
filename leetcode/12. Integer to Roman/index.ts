export function intToRoman(num: number): string {
  // 比较特殊的是 4, 9 以及这两个数字的 (4 | 9) * 10 ^x 倍数
  const numRoman: any = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M'
  }

  // 因为如果用罗马数字表达，那个数字必然要进行组装成这里面的数字来进行组合
  let initialStr = ''
  const sortedKeys = Object.keys(numRoman).sort((a, b) =>
    Number(a) < Number(b) ? 1 : -1
  )
  for (let i = 0; i < sortedKeys.length; i++) {
    const tem = num
    num = num % Number(sortedKeys[i])
    // 代表无法整除
    if (num === tem) {
      continue
    } else {
      const f = Math.floor(tem / Number(sortedKeys[i]))
      initialStr += new Array(f)
        .fill(0)
        .map(() => numRoman[Number(sortedKeys[i])])
        .join('')
    }
  }

  return initialStr
}
