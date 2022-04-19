import { shortestToChar } from './index'

describe('字符的最短距离', () => {
  it('test', () => {
    expect(shortestToChar('loveleetcode', 'e')).toEqual([
      3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0
    ])
    expect(shortestToChar('aaab', 'b')).toEqual([3, 2, 1, 0])
  })
})
