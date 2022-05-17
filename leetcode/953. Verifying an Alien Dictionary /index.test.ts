import { isAlienSorted } from './index'

describe('验证外星语词典', () => {
  it('test', () => {
    expect(
      isAlienSorted(['kuvp', 'q'], 'ngxlkthsjuoqcpavbfdermiywz')
    ).toBeTruthy()
  })
})
