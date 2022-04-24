import { binaryGap } from './index'

describe('二进制间距', () => {
  it('test', () => {
    expect(binaryGap(22)).toBe(2)
    expect(binaryGap(8)).toBe(0)
    expect(binaryGap(5)).toBe(2)
  })
})
