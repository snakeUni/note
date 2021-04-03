import { longestCommonSubsequence } from './index'

describe('最长子序列', () => {
  it('test', () => {
    console.log(longestCommonSubsequence('abcde', 'ace'))
    expect(longestCommonSubsequence('abcde', 'ace')).toBe(3)
  })
})
