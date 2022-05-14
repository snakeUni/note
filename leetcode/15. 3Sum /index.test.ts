import { threeSum } from './index'

describe('三数之和', () => {
  it('test', () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([
      [-1, -1, 2],
      [-1, 0, 1]
    ])
    expect(threeSum([0])).toEqual([])
    expect(threeSum([])).toEqual([])
  })
})
