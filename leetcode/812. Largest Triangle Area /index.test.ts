import { largestTriangleArea } from './index'

describe('最大三角形面积', () => {
  it('test', () => {
    expect(
      largestTriangleArea([
        [0, 0],
        [0, 1],
        [1, 0],
        [0, 2],
        [2, 0]
      ])
    ).toBe(2)
  })
})
