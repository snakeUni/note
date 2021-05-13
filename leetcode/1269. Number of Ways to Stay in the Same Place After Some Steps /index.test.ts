import { numWays } from './index'

describe('停在原地的方案数', () => {
  it('test', () => {
    expect(numWays(3, 2)).toBe(4)
    expect(numWays(2, 4)).toBe(2)
    expect(numWays(4, 2)).toBe(8)
  })
})
