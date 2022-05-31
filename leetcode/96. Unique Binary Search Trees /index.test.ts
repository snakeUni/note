import { numTrees } from './index'

describe('不同的二叉搜索树', () => {
  it('test', () => {
    expect(numTrees(3)).toBe(5)
    expect(numTrees(1)).toBe(1)
  })
})
