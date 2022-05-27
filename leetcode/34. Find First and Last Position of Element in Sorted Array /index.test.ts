import { searchRange } from './index'

describe(' 在排序数组中查找元素的第一个和最后一个位置', () => {
  it('test', () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4])
    expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1])
    expect(searchRange([], 0)).toEqual([-1, -1])
  })
})
