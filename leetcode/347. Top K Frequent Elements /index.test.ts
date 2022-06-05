import { topKFrequent } from './index'

describe('前 K 个高频元素', () => {
  it('test', () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 2])
    expect(topKFrequent([1], 1)).toEqual([1])
  })
})
