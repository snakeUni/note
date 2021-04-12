import { largestNumber } from './index'

describe('最大数测试', () => {
  it('test', () => {
    expect(largestNumber([10, 2])).toBe('210')
    expect(largestNumber([30, 3])).toBe('330')
    expect(largestNumber([1])).toBe('1')
    expect(largestNumber([10])).toBe('10')
    expect(largestNumber([111311, 1113])).toBe('1113111311')
  })
})
