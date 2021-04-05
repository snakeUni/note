import { merge } from './index'

describe('merge test', () => {
  it('test', () => {
    let num1 = [1, 2, 3, 0, 0, 0]
    merge(num1, 3, [2, 5, 6], 3)
    console.log(num1)

    expect(num1).toEqual([1, 2, 2, 3, 5, 6])
  })
})
