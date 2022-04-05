import { countPrimeSetBits } from './index'

describe('二进制表示中质数个计算置位', () => {
  it('test', () => {
    expect(countPrimeSetBits(6, 10)).toBe(4)
    expect(countPrimeSetBits(10, 15)).toBe(5)
  })
})
