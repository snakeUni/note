import { rotateString, rotateString2 } from './index'

describe('旋转字符串', () => {
  it('test', () => {
    expect(rotateString('abcde', 'cdeab')).toBeTruthy()
    expect(rotateString('abcde', 'abced')).toBeFalsy()
    expect(rotateString2('abcde', 'cdeab')).toBeTruthy()
    expect(rotateString2('abcde', 'abced')).toBeFalsy()
  })
})
