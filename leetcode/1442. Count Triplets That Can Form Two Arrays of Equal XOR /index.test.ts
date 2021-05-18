import { countTriplets } from './index'

describe('形成两个异或相等数组的三元组数目', () => {
  it('test', () => {
    expect(countTriplets([2, 3, 1, 6, 7])).toBe(4)
    expect(countTriplets([1, 1, 1, 1, 1])).toBe(10)
    expect(countTriplets([2, 3])).toBe(0)
    expect(countTriplets([1, 3, 5, 7, 9])).toBe(3)
    expect(countTriplets([7, 11, 12, 9, 5, 2, 7, 17, 22])).toBe(8)
  })
})
