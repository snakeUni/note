import { countBits } from './index'

describe(' 比特位计数', () => {
  it('test', () => {
    expect(countBits(2)).toEqual([0, 1, 1])
    expect(countBits(5)).toEqual([0, 1, 1, 2, 1, 2])
  })
})
