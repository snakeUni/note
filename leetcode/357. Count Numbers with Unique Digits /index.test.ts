import { countNumbersWithUniqueDigits } from './index'

describe('统计各位数字都不同的数字个数', () => {
  it('test', () => {
    expect(countNumbersWithUniqueDigits(2)).toBe(91)
    expect(countNumbersWithUniqueDigits(0)).toBe(1)
  })
})
