import { productExceptSelf, productExceptSelf2 } from './index'

describe('除自身以外数组的乘积', () => {
  it('test', () => {
    expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6])
    expect(productExceptSelf([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0])
    expect(productExceptSelf2([1, 2, 3, 4])).toEqual([24, 12, 8, 6])
    expect(productExceptSelf2([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0])
  })
})
