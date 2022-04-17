import { mostCommonWord } from './index'

describe('最常见的单词', () => {
  it('test', () => {
    expect(
      mostCommonWord(
        'Bob hit a ball, the hit BALL flew far after it was hit.',
        ['hit']
      )
    ).toBe('ball')
  })
})
