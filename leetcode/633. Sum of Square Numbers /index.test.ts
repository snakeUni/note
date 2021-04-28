import { judgeSquareSum } from './index'

describe('平方数之和', () => {
  it('test', () => {
    expect(judgeSquareSum(5)).toBe(true)
    expect(judgeSquareSum(3)).toBe(true)
    expect(judgeSquareSum(4)).toBe(true)
    expect(judgeSquareSum(2)).toBe(true)
  })
})
