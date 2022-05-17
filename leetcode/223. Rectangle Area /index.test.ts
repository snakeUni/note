import { computeArea } from './index'

describe('矩形面积', () => {
  it('test', () => {
    expect(computeArea(-3, 0, 3, 4, 0, -1, 9, 2)).toBe(45)
  })
})
