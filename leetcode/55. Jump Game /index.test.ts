import { canJump } from './index'

describe('跳跃游戏', () => {
  it('test', () => {
    expect(canJump([2, 3, 1, 1, 4])).toBe(true)
    expect(canJump([3, 2, 1, 0, 4])).toBe(false)
  })
})
