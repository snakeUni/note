import { longestPalindrome } from './index'

describe('最长回文子串', () => {
  it('test', () => {
    expect(longestPalindrome('babad')).toBe('bab')
    expect(longestPalindrome('cbbd')).toBe('bb')
  })
})
