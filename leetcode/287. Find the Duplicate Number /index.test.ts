import { findDuplicate } from './index'

describe('寻找重复数', () => {
  it('test', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toBe(2)
    expect(findDuplicate([3, 1, 3, 4, 2])).toBe(3)
  })
})
