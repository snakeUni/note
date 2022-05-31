import { subsets } from './index'

describe('子集', () => {
  expect(subsets([1, 2, 3])).toEqual([
    [],
    [1],
    [2],
    [1, 2],
    [3],
    [1, 3],
    [2, 3],
    [1, 2, 3]
  ])
})
