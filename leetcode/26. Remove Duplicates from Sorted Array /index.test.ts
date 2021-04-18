import { removeDuplicates } from './index'

describe('删除有序数组中的重复项', () => {
  it('test', () => {
    expect(removeDuplicates([1, 1, 2])).toBe(2)
    expect(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toBe(5)
  })
})
