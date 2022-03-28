import {
  hasAlternatingBits,
  hasAlternatingBits2,
  hasAlternatingBits3
} from './index'

describe('交替位二进制数', () => {
  it('test 交替位二进制数', () => {
    expect(hasAlternatingBits(5)).toBeTruthy()
    expect(hasAlternatingBits(7)).toBeFalsy()
    expect(hasAlternatingBits(11)).toBeFalsy()
    expect(hasAlternatingBits2(5)).toBeTruthy()
    expect(hasAlternatingBits2(7)).toBeFalsy()
    expect(hasAlternatingBits2(11)).toBeFalsy()
    expect(hasAlternatingBits3(5)).toBeTruthy()
    expect(hasAlternatingBits3(7)).toBeFalsy()
    expect(hasAlternatingBits3(11)).toBeFalsy()
  })
})
