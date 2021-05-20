import { topKFrequent } from './index'

describe('前 K 个高频单词', () => {
  it('test', () => {
    expect(
      topKFrequent(['i', 'love', 'leetcode', 'i', 'love', 'coding'], 2)
    ).toEqual(['i', 'love'])
    expect(
      topKFrequent(
        ['the', 'day', 'is', 'sunny', 'the', 'the', 'the', 'sunny', 'is', 'is'],
        4
      )
    ).toEqual(['the', 'is', 'sunny', 'day'])
  })
})
