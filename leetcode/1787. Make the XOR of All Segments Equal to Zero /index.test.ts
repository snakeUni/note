import { minChanges } from './index'

describe('使所有区间的异或结果为零', () => {
  it('test', () => {
    expect(minChanges([1, 2, 0, 3, 0], 1)).toBe(3)
    expect(minChanges([3, 4, 5, 2, 1, 7, 3, 4, 7], 3)).toBe(3)
    expect(minChanges([1, 2, 4, 1, 2, 5, 1, 2, 6], 3)).toBe(3)
  })
})
