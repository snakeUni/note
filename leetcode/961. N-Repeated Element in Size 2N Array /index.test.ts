import { repeatedNTimes, repeatedNTimes2 } from './index'

describe('在长度 2N 的数组中找出重复 N 次的元素', () => {
  expect(repeatedNTimes([1, 2, 3, 3])).toBe(3)
  expect(repeatedNTimes([2, 1, 2, 5, 3, 2])).toBe(2)
  expect(repeatedNTimes([5, 1, 5, 2, 5, 3, 5, 4])).toBe(5)
})
