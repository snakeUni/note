import { totalHammingDistance } from './index'

describe('汉明距离总和', () => {
  it('test', () => {
    expect(totalHammingDistance([4, 14, 2])).toBe(6)
  })
})
