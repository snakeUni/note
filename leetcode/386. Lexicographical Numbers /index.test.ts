import { lexicalOrder } from './index'

describe('字典序排数', () => {
  it('test', () => {
    expect(lexicalOrder(13)).toEqual([
      1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9
    ])
    expect(lexicalOrder(2)).toEqual([1, 2])
  })
})
