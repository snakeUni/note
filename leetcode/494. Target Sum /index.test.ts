import { findTargetSumWays } from './index'

describe('目标和', () => {
  it('test', () => {
    expect(findTargetSumWays([1, 1, 1, 1, 1], 3)).toBe(5)
    expect(findTargetSumWays([1], 1)).toBe(1)
  })
})
