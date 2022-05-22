import { findDisappearedNumbers } from './index'

describe('找到所有数组中消失的数字', () => {
  it('test', () => {
    expect(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([5, 6])
    expect(findDisappearedNumbers([1, 1])).toEqual([2])
  })
})
