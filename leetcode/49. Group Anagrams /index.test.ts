import { groupAnagrams } from './index'

describe('字母异位词分组', () => {
  it('test', () => {
    expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).toEqual([
      ['bat'],
      ['nat', 'tan'],
      ['ate', 'eat', 'tea']
    ])
    expect(groupAnagrams([''])).toEqual([['']])
    expect(groupAnagrams(['a'])).toEqual([['a']])
  })
})
