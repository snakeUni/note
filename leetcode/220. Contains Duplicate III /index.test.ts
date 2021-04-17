import { containsNearbyAlmostDuplicate } from './index'

describe('存在重复元素 III', () => {
  it('test', () => {
    expect(containsNearbyAlmostDuplicate([1, 2, 3, 1], 3, 0)).toBe(true)
    expect(containsNearbyAlmostDuplicate([1, 0, 1, 1], 1, 2)).toBe(true)
    expect(containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3)).toBe(false)
  })
})
