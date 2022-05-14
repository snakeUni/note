import { threeSumClosest } from './index'

describe('最接近的三数之和', () => {
  it('test', () => {
    expect(threeSumClosest([-1, 2, 1, -4], 1)).toBe(2)
    expect(threeSumClosest([0, 0, 0], 1)).toBe(0)
  })
})
