import { RandomizedSet } from './index'

describe('O(1) 时间插入、删除和获取随机元素', () => {
  it('test', () => {
    const randomizedSet = new RandomizedSet()
    expect(randomizedSet.insert(1)).toBe(true)
    expect(randomizedSet.remove(2)).toBeFalsy()
    expect(randomizedSet.insert(2)).toBeTruthy()
    expect(randomizedSet.remove(1)).toBeTruthy()
    expect(randomizedSet.insert(2)).toBeFalsy()
    expect(randomizedSet.getRandom()).toBe(2)
  })
})
