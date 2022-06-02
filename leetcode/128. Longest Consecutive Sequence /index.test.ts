import { longestConsecutive } from './index'

describe('最长连续序列', () => {
  it('test', () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4)
    expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9)
  })
})
