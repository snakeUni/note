import { reachingPoints } from './index'

describe('到达终点', () => {
  it('test', () => {
    expect(reachingPoints(1, 1, 3, 5)).toBeTruthy()
    expect(reachingPoints(1, 1, 2, 2)).toBeFalsy()
    expect(reachingPoints(1, 1, 1, 1)).toBeTruthy()
  })
})
