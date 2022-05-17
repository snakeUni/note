import { containsNearbyDuplicate } from './index'

describe(' 存在重复元素 II', () => {
  it('test', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 3)).toBeTruthy()
  })
})
