import { reverseParentheses } from './index'

describe('反转每对括号间的子串', () => {
  it('test', () => {
    expect(reverseParentheses('(abcd)')).toBe('dcba')
  })
})
