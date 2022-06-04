import { dailyTemperatures, dailyTemperatures2 } from './index'

describe('每日温度', () => {
  it('test', () => {
    expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([
      1, 1, 4, 2, 1, 1, 0, 0
    ])
    expect(dailyTemperatures([30, 40, 50, 60])).toEqual([1, 1, 1, 0])
    expect(dailyTemperatures([30, 60, 90])).toEqual([1, 1, 0])
    expect(dailyTemperatures2([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([
      1, 1, 4, 2, 1, 1, 0, 0
    ])
    expect(dailyTemperatures2([30, 40, 50, 60])).toEqual([1, 1, 1, 0])
    expect(dailyTemperatures2([30, 60, 90])).toEqual([1, 1, 0])
  })
})
