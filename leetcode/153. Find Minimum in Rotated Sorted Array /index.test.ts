import { findMin } from './index'

describe('寻找旋转排序数组中的最小值', () => {
  it('test', () => {
    expect(findMin([3, 4, 5, 1, 2])).toBe(1)
    expect(findMin([4, 5, 6, 7, 0, 1, 2])).toBe(0)
    expect(findMin([11, 13, 15, 17])).toBe(11)
  })
})
