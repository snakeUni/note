import { NumArray } from './index'

describe('区域和检索测试', () => {
  it('test', () => {
    const numArray = new NumArray([1, 3, 5])
    expect(numArray.sumRange(0, 2)).toBe(9)
    numArray.update(1, 2)
    expect(numArray.sumRange(0, 2)).toBe(8)
  })
})
