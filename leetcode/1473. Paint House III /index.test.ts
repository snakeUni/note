import { minCost } from './index'

describe('粉刷房子 III test', () => {
  it('test', () => {
    expect(
      minCost(
        [0, 0, 0, 0, 0],
        [
          [1, 10],
          [10, 1],
          [10, 1],
          [1, 10],
          [5, 1]
        ],
        5,
        2,
        3
      )
    ).toBe(9)
  })
})
