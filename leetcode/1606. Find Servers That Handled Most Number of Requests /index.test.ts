import { busiestServers } from './index'

describe('找到处理最多请求的服务器', () => {
  it('test busiestServers', () => {
    expect(busiestServers(3, [1, 2, 3, 4, 5], [5, 2, 3, 3, 3])).toEqual([1])
    expect(busiestServers(3, [1, 2, 3], [10, 12, 11])).toEqual([0, 1, 2])
    expect(busiestServers(3, [1, 2, 3, 4], [1, 2, 1, 2])).toEqual([0])
    expect(
      busiestServers(3, [1, 2, 3, 4, 8, 9, 10], [5, 2, 10, 3, 1, 2, 2])
    ).toEqual([1])
    expect(busiestServers(1, [1], [1])).toEqual([0])
  })
})
