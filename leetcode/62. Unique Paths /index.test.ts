import { uniquePaths, uniquePaths2 } from './index'

describe('不同路径', () => {
  it('test 1', () => {
    expect(uniquePaths(3, 7)).toBe(28)
    expect(uniquePaths(3, 2)).toBe(3)
    expect(uniquePaths(7, 3)).toBe(28)
    expect(uniquePaths(3, 3)).toBe(6)
  })
  it('test 2', () => {
    expect(uniquePaths2(3, 7)).toBe(28)
    expect(uniquePaths2(3, 2)).toBe(3)
    expect(uniquePaths2(7, 3)).toBe(28)
    expect(uniquePaths2(3, 3)).toBe(6)
  })
})
