import { exist } from './index'

describe('单词搜索', () => {
  it('test', () => {
    expect(
      exist(
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E']
        ],
        'ABCCED'
      )
    ).toBe(true)
  })
})
