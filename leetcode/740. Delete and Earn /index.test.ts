import { deleteAndEarn } from './index'

describe('删除并获得点数', () => {
  it('test', () => {
    expect(deleteAndEarn([3, 4, 2])).toBe(6)
    expect(deleteAndEarn([2, 2, 3, 3, 3, 4])).toBe(9)
    expect(deleteAndEarn([2, 2, 3, 4])).toBe(8)
  })
})
