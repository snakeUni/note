import { nextPermutation } from './index'

describe('下一个排列', () => {
  it('test', () => {
    let nums = [1, 2, 3]
    nextPermutation(nums)
    expect(nums).toEqual([1, 3, 2])

    let num1 = [3, 2, 1]
    nextPermutation(num1)
    expect(num1).toEqual([1, 2, 3])

    let num2 = [1, 1, 5]
    nextPermutation(num2)
    expect(num2).toEqual([1, 5, 1])
  })
})
