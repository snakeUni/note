import { wordBreak } from './index'

describe('单词拆分', () => {
  it('test', () => {
    expect(wordBreak('leetcode', ['leet', 'code'])).toBeTruthy()
    expect(wordBreak('applepenapple', ['apple', 'pen'])).toBeTruthy()
    expect(
      wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])
    ).toBeFalsy()
  })
})
