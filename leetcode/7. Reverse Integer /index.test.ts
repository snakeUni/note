import { reverse } from './index'

describe('两数反转', () => {
  it('test', () => {
    expect(reverse(123)).toBe(321)
    expect(reverse(-123)).toBe(-321)
    expect(reverse(120)).toBe(21)
    expect(reverse(0)).toBe(0)
  })
})
