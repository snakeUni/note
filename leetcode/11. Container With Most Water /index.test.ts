import { maxArea } from './index'

describe('盛最多水的容器', () => {
  it('test', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49)
    expect(maxArea([1, 1])).toBe(1)
  })
})
