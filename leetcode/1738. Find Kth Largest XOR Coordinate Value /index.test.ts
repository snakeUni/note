import { kthLargestValue } from './index'

describe('找出第 K 大的异或坐标值', () => {
  const matrix = [
    [5, 2],
    [1, 6]
  ]
  it('test', () => {
    expect(kthLargestValue(matrix, 1)).toBe(7)
    expect(kthLargestValue(matrix, 2)).toBe(5)
    expect(kthLargestValue(matrix, 3)).toBe(4)
    expect(kthLargestValue(matrix, 4)).toBe(0)
  })
})
