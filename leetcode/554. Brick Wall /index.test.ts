import { leastBricks } from './index'

describe('砖墙', () => {
  it('test', () => {
    expect(
      leastBricks([
        [1, 2, 2, 1],
        [3, 1, 2],
        [1, 3, 2],
        [2, 4],
        [3, 1, 2],
        [1, 3, 1, 1]
      ])
    ).toBe(2)
    expect(leastBricks([[1], [1], [1]])).toBe(3)
  })
})
