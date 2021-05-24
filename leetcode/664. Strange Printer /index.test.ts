import { strangePrinter } from './index'

describe('奇怪的打印机', () => {
  it('test', () => {
    expect(strangePrinter('aaabbb')).toBe(2)
    expect(strangePrinter('aba')).toBe(2)
  })
})
