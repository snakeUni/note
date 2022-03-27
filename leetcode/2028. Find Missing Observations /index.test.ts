import { missingRolls } from './index'

describe('找出缺失的观测数据', () => {
  it('test 找出缺失的观测数据', () => {
    expect(missingRolls([3, 2, 4, 3], 4, 2)).toEqual([6, 6])
  })
})
