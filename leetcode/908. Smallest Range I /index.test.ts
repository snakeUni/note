import { smallestRangeI } from './index'

describe('最小差值 I', () => {
  it('test', () => {
    expect(smallestRangeI([1], 0)).toBe(0)
    expect(smallestRangeI([0, 10], 2)).toBe(6)
    expect(smallestRangeI([1, 3, 6], 3)).toBe(0)
  })
})
