import { oneEditAway } from './index'

describe('面试题 01.05. 一次编辑', () => {
  it('test', () => {
    expect(oneEditAway('pale', 'ple')).toBe(true)
    expect(oneEditAway('pales', 'pal')).toBeFalsy()
  })
})
