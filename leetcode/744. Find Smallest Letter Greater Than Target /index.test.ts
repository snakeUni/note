import { nextGreatestLetter, nextGreatestLetter2 } from './index'

describe('寻找比目标字母大的最小字母 Test', () => {
  it('test nextGreatestLetter', () => {
    expect(nextGreatestLetter(['c', 'f', 'j'], 'a')).toBe('c')
    expect(nextGreatestLetter(['c', 'f', 'j'], 'c')).toBe('f')
    expect(nextGreatestLetter(['c', 'f', 'j'], 'd')).toBe('f')
  })
  it('test nextGreatestLetter2', () => {
    expect(nextGreatestLetter2(['c', 'f', 'j'], 'a')).toBe('c')
    expect(nextGreatestLetter2(['c', 'f', 'j'], 'c')).toBe('f')
    expect(nextGreatestLetter2(['c', 'f', 'j'], 'd')).toBe('f')
  })
})
