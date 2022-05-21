import { maxProfit } from './index'

describe('买卖股票的最佳时机', () => {
  it('test', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5)
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0)
  })
})
