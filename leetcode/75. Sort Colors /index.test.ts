import { sortColors } from './index'

describe('颜色分类', () => {
  it('test', () => {
    let nums = [2, 0, 2, 1, 1, 0]
    sortColors(nums)
    expect(nums).toEqual([0, 0, 1, 1, 2, 2])
    let num2 = [2, 0, 1]
    sortColors(num2)
    expect(num2).toEqual([0, 1, 2])
  })
})
