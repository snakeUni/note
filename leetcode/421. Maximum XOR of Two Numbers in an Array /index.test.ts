import { findMaximumXOR } from './index'

describe('数组中两个数的最大异或值', () => {
  it('test', () => {
    expect(findMaximumXOR([3, 10, 5, 25, 2, 8])).toBe(28)
    expect(findMaximumXOR([8, 10, 2])).toBe(10)
    expect(
      findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])
    ).toBe(127)
  })
})
