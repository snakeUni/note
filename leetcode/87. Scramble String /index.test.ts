import { isScramble } from './index'

describe('扰乱字符串', () => {
  it('test', () => {
    expect(isScramble('great', 'rgeat')).toBe(true)
    expect(isScramble('abcde', 'caebd')).toBe(false)
    expect(isScramble('a', 'a')).toBe(true)
    expect(isScramble('abcdbdacbdac', 'bdacabcdbdac')).toBe(true)
    expect(isScramble('aa', 'ab')).toBe(false)
  })
})
