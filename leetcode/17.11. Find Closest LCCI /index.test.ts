import { findClosest } from './index'

describe('单词距离', () => {
  it('test', () => {
    expect(
      findClosest(
        [
          'I',
          'am',
          'a',
          'student',
          'from',
          'a',
          'university',
          'in',
          'a',
          'city'
        ],
        'a',
        'student'
      )
    ).toBe(1)
  })
})
