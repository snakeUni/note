import { maxRotateFunction } from './index'

describe('旋转函数', () => {
  it('test', () => {
    expect(maxRotateFunction([4, 3, 2, 6])).toBe(26)
    expect(maxRotateFunction([100])).toBe(0)
  })
})
