import { majorityElement } from './index'

describe('多数元素', () => {
  it('test', () => {
    expect(majorityElement([3, 2, 3])).toBe(3)
    expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2)
  })
})
