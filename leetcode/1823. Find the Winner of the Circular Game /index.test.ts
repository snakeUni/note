import { findTheWinner2 } from './index'

describe('找出游戏的获胜者', () => {
  it('test', () => {
    expect(findTheWinner2(5, 2)).toBe(3)
    expect(findTheWinner2(6, 5)).toBe(1)
  })
})
