import { findDuplicates } from './index'

describe('数组中重复的数据', () => {
  expect(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([2, 3])
  expect(findDuplicates([1, 1, 2])).toEqual([1])
  expect(findDuplicates([1])).toEqual([])
})
