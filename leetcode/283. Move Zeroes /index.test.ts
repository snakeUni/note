import { moveZeroes } from './index'

describe('移动零', () => {
  it('test', () => {
    let nums = [0, 1, 0, 3, 12]
    moveZeroes(nums)
    expect(nums).toEqual([1, 3, 12, 0, 0])
  })
})
