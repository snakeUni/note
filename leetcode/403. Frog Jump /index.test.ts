import { canCross } from './index'

describe('青蛙过河', () => {
  it('test', () => {
    expect(canCross([0, 1, 3, 5, 6, 8, 12, 17])).toBeTruthy()
    expect(canCross([0, 1, 2, 3, 4, 8, 9, 11])).toBeFalsy()
  })
})
