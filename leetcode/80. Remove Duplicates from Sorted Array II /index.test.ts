import { removeDuplicates } from './index'

describe('removeDuplicates', () => {
  it('test', () => {
    expect(removeDuplicates([1, 1, 1, 2, 2, 3])).toBe(5)
    expect(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3])).toBe(7)
  })
})
