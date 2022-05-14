import { letterCombinations } from './index'

describe('电话号码的字母组合', () => {
  it('test', () => {
    expect(letterCombinations('23')).toEqual([
      'ad',
      'ae',
      'af',
      'bd',
      'be',
      'bf',
      'cd',
      'ce',
      'cf'
    ])
    expect(letterCombinations('2')).toEqual(['a', 'b', 'c'])
    expect(letterCombinations('')).toEqual([])
  })
})
