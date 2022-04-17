import { plusOne } from './index'

describe('加一', () => {
  it('test', () => {
    expect(plusOne([4, 3, 2, 1])).toEqual([4, 3, 2, 2])
    expect(plusOne([0])).toEqual([1])
  })
})
