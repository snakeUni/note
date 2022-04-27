import { pacificAtlantic } from './index'

describe('太平洋大西洋水流问题', () => {
  expect(
    pacificAtlantic([
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
      [2, 4, 5, 3, 1],
      [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4]
    ])
  ).toEqual([
    [0, 4],
    [1, 3],
    [1, 4],
    [2, 2],
    [3, 0],
    [3, 1],
    [4, 0]
  ])
  expect(
    pacificAtlantic([
      [2, 1],
      [1, 2]
    ])
  ).toEqual([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ])
})
