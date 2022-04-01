import { canReorderDoubled } from './index'

describe('二倍数对数组测试', () => {
  it('test canReorderDoubled', () => {
    expect(canReorderDoubled([2, 1, 2, 1, 1, 1, 2, 2])).toBeTruthy()
  })
})
