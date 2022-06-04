import { subarraySum, subarraySum2 } from './index'

describe('和为 K 的子数组', () => {
  it('test', () => {
    expect(subarraySum([1, 1, 1], 2)).toBe(2)
    expect(subarraySum([1, 2, 3], 3)).toBe(2)
    expect(subarraySum2([1, 1, 1], 2)).toBe(2)
    expect(subarraySum2([1, 2, 3], 3)).toBe(2)
  })
})
