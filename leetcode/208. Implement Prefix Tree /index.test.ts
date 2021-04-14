import { Trie, Trie2 } from './index'

describe('实现 Trie (前缀树)', () => {
  it('test', () => {
    const obj = new Trie()
    obj.insert('apple')
    expect(obj.search('apple')).toBe(true)
    expect(obj.search('app')).toBe(false)
    expect(obj.startsWith('app')).toBe(true)
    obj.insert('app')
    expect(obj.search('app')).toBe(true)
  })

  it('test2', () => {
    const obj = new Trie2()
    obj.insert('apple')
    expect(obj.search('apple')).toBe(true)
    expect(obj.search('app')).toBe(false)
    expect(obj.startsWith('app')).toBe(true)
    obj.insert('app')
    expect(obj.search('app')).toBe(true)
    console.log(obj.prefix)
  })
})
