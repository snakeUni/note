import { maximizeXor } from './index'

describe('与数组中元素的最大异或值', () => {
  it('test', () => {
    expect(
      maximizeXor(
        [0, 1, 2, 3, 4],
        [
          [3, 1],
          [1, 3],
          [5, 6]
        ]
      )
    ).toEqual([3, 3, 7])
    expect(
      maximizeXor(
        [5, 2, 4, 6, 6, 3],
        [
          [12, 4],
          [8, 1],
          [6, 3]
        ]
      )
    ).toEqual([15, -1, 5])
  })
})
