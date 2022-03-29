import { maxConsecutiveAnswers } from './index'

describe('考试的最大困扰度 test', () => {
  it('test maxConsecutiveChar', () => {
    expect(maxConsecutiveAnswers('TTFF', 2)).toBe(4)
    expect(maxConsecutiveAnswers('TFFT', 1)).toBe(3)
    expect(maxConsecutiveAnswers('TTFTTFTT', 1)).toBe(5)
  })
})
