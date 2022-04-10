export function uniqueMorseRepresentations(words: string[]): number {
  if (words.length === 1) return 1
  const result = new Set()
  const wordPassword = new Map([
    ['a', '.-'],
    ['b', '-...'],
    ['c', '-.-.'],
    ['d', '-..'],
    ['e', '.'],
    ['f', '..-.'],
    ['g', '--.'],
    ['h', '....'],
    ['i', '..'],
    ['j', '.---'],
    ['k', '-.-'],
    ['l', '.-..'],
    ['m', '--'],
    ['n', '-.'],
    ['o', '---'],
    ['p', '.--.'],
    ['q', '--.-'],
    ['r', '.-.'],
    ['s', '...'],
    ['t', '-'],
    ['u', '..-'],
    ['v', '...-'],
    ['w', '.--'],
    ['x', '-..-'],
    ['y', '-.--'],
    ['z', '--..']
  ])

  for (let i = 0; i < words.length; i++) {
    const curWord = words[i]
    const password = [...curWord].reduce((acc, cur) => {
      return acc + wordPassword.get(cur)
    }, '')
    result.add(password)
  }

  return result.size
}
