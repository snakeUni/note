import { countPrimes, countPrimes2 } from './index'

describe('计数质数', () => {
  it('test', () => {
    expect(countPrimes(10)).toBe(4)
    expect(countPrimes(0)).toBe(0)
    expect(countPrimes(1)).toBe(0)
    // 2
    expect(countPrimes2(10)).toBe(4)
    expect(countPrimes2(0)).toBe(0)
    expect(countPrimes2(1)).toBe(0)
  })
})
