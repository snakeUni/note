import { uniqueMorseRepresentations } from './index'

describe('唯一摩尔斯密码词', () => {
  it('test', () => {
    expect(uniqueMorseRepresentations(['gin', 'zen', 'gig', 'msg'])).toBe(2)
    expect(uniqueMorseRepresentations(['a'])).toBe(1)
  })
})
