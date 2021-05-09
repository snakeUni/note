import { minDays } from './index'

describe('制作 m 束花所需的最少天数', () => {
  it('test', () => {
    expect(minDays([1, 10, 3, 10, 2], 3, 1)).toBe(3)
  })
})
