import { trap, trapPoint } from './index'

describe('接雨水测试', () => {
  it('test', () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6)
  })

  it('test point', () => {
    expect(trapPoint([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6)
  })
})
