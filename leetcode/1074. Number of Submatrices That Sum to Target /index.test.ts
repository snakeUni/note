import { numSubmatrixSumTarget } from './index'

describe('元素和为目标值的子矩阵数量', () => {
  it('test', () => {
    expect(
      numSubmatrixSumTarget(
        [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ],
        0
      )
    ).toBe(4)
  })
})
