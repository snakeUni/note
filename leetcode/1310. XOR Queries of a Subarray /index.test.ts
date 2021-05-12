import { xorQueries } from './index'

describe('子数组异或查询', () => {
  it('test', () => {
    expect(
      xorQueries(
        [1, 3, 4, 8],
        [
          [0, 1],
          [1, 2],
          [0, 3],
          [3, 3]
        ]
      )
    ).toEqual([2, 7, 14, 8])
  })
})
