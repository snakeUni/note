import { maxProfit } from './index'

describe('最佳买卖股票时机含冷冻期', () => {
  it('test', () => {
    expect(maxProfit([1, 2, 3, 0, 2])).toBe(3)
    expect(maxProfit([1])).toBe(0)
  })
})
