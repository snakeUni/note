import { singleNumber } from './index'

describe('只出现一次的数字 II', () => {
  it('test', () => {
    expect(singleNumber([2, 2, 3, 2])).toBe(3)
    expect(singleNumber([0, 1, 0, 1, 0, 1, 99])).toBe(99)
  })
})
