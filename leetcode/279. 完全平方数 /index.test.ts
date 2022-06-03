import { numSquares, numSquares2 } from './index'

describe('完全平方数', () => {
  it('test', () => {
    expect(numSquares(12)).toBe(3)
    expect(numSquares(13)).toBe(2)
    expect(numSquares2(12)).toBe(3)
    expect(numSquares2(13)).toBe(3)
  })
})
