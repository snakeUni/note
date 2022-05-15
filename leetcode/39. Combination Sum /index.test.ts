import { combinationSum } from './index'

describe('组合总和', () => {
  it('test', () => {
    expect(combinationSum([2, 3, 6, 7], 7)).toEqual([[7], [2, 2, 3]])
    expect(combinationSum([2, 3, 5], 8)).toEqual([
      [3, 5],
      [2, 3, 3],
      [2, 2, 2, 2]
    ])
    expect(combinationSum([2], 1)).toEqual([])
  })
})
