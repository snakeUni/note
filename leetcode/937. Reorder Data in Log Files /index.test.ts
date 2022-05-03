import { reorderLogFiles } from './index'

describe('重新排列日志文件', () => {
  it('test', () => {
    expect(
      reorderLogFiles([
        'dig1 8 1 5 1',
        'let1 art can',
        'dig2 3 6',
        'let2 own kit dig',
        'let3 art zero'
      ])
    ).toEqual([
      'let1 art can',
      'let3 art zero',
      'let2 own kit dig',
      'dig1 8 1 5 1',
      'dig2 3 6'
    ])

    expect(
      reorderLogFiles([
        'a1 9 2 3 1',
        'g1 act car',
        'zo4 4 7',
        'ab1 off key dog',
        'a8 act zoo'
      ])
    ).toEqual([
      'g1 act car',
      'a8 act zoo',
      'ab1 off key dog',
      'a1 9 2 3 1',
      'zo4 4 7'
    ])
  })
})
