export function toGoatLatin(sentence: string): string {
  const yuanYin = new Set(['a', 'e', 'i', 'o', 'u'])

  const translate = (c: string) => {
    if (yuanYin.has(c[0].toLowerCase())) {
      c = `${c}ma`
    } else {
      const first = c[0]
      c = `${c.slice(1)}${first}ma`
    }

    return c
  }

  const sArray = sentence.split(' ')

  for (let i = 0; i < sArray.length; i++) {
    sArray[i] = translate(sArray[i]).padEnd(sArray[i].length + 2 + i + 1, 'a')
  }

  return sArray.join(' ')
}
