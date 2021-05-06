import { decode } from './index'

describe('解码异或后的数组', () => {
  it('test', () => {
    expect(decode([1, 2, 3], 1)).toEqual([1, 0, 2, 1])
  })
})
