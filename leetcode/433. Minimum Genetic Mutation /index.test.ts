import { minMutation } from './index'

describe('最小基因变化', () => {
  it('test', () => {
    expect(minMutation('AACCGGTT', 'AACCGGTA', ['AACCGGTA'])).toBe(1)
    expect(
      minMutation('AACCGGTT', 'AAACGGTA', ['AACCGGTA', 'AACCGCTA', 'AAACGGTA'])
    ).toBe(2)
    expect(
      minMutation('AAAAACCC', 'AACCCCCC', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'])
    ).toBe(3)
  })
})
