import { findUnsortedSubarray, findUnsortedSubarray2 } from './index'

describe('最短无序连续子数组', () => {
  it('test', () => {
    expect(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])).toBe(5)
    expect(findUnsortedSubarray([1, 2, 3, 4])).toBe(0)
    expect(findUnsortedSubarray([1])).toBe(0)
    expect(findUnsortedSubarray2([2, 6, 4, 8, 10, 9, 15])).toBe(5)
    expect(findUnsortedSubarray2([1, 2, 3, 4])).toBe(0)
    expect(findUnsortedSubarray2([1])).toBe(0)
  })
})
