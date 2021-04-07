import { search } from './index'

describe('搜索旋转排序数组 II', () => {
  it('test', () => {
    expect(search([2, 5, 6, 0, 0, 1, 2], 0)).toBeTruthy()
    expect(search([2, 5, 6, 0, 0, 1, 2], 3)).toBeFalsy()
  })
})
