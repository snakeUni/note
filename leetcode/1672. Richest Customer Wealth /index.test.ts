import { maximumWealth } from './index'

describe('最富有客户的资产总量', () => {
  it('test', () => {
    expect(
      maximumWealth([
        [1, 2, 3],
        [3, 2, 1]
      ])
    ).toBe(6)
    expect(
      maximumWealth([
        [1, 5],
        [7, 3],
        [3, 5]
      ])
    ).toBe(10)
  })
})
