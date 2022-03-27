import { lengthOfLongestSubstring, lengthOfLongestSubstring2 } from './index'

describe('lengthOfLongestSubstring test', () => {
  it('test lengthOfLongestSubstring', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3)
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1)
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3)
  })

  it('test lengthOfLongestSubstring2', () => {
    expect(lengthOfLongestSubstring2('abcabcbb')).toBe(3)
    expect(lengthOfLongestSubstring2('bbbbb')).toBe(1)
    expect(lengthOfLongestSubstring2('pwwkew')).toBe(3)
  })
})
