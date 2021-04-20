import { strStr } from './index'

describe('实现 strStr()', () => {
  it('test', () => {
    expect(strStr('hello', 'll')).toBe(2)
    expect(strStr('aaaaa', 'bba')).toBe(-1)
    expect(strStr('', '')).toBe(0)
  })
})
