import { minDeletionSize } from './index'

describe('删列造序', () => {
  it('test', () => {
    expect(minDeletionSize(['cba', 'daf', 'ghi'])).toBe(1)
    expect(minDeletionSize(['a', 'b'])).toBe(0)
    expect(minDeletionSize(['zyx', 'wvu', 'tsr'])).toBe(3)
  })
})
