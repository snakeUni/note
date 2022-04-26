import { projectionArea } from './index'

describe('三维形体投影面积', () => {
  expect(
    projectionArea([
      [1, 2],
      [3, 4]
    ])
  ).toBe(17)
  expect(projectionArea([[2]])).toBe(5)
  expect([
    [1, 0],
    [0, 2]
  ]).toBe(8)
})
