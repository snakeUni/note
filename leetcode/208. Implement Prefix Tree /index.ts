export class Trie {
  prefix: { [key: string]: string }
  constructor() {
    this.prefix = {}
  }

  insert(word: string): void {
    this.prefix[word] = word
  }

  search(word: string): boolean {
    return !!this.prefix[word]
  }

  startsWith(prefix: string): boolean {
    const keys = Object.keys(this.prefix)

    for (let i = 0; i < keys.length; i++) {
      if (keys[i].startsWith(prefix)) {
        return true
      }
    }

    return false
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

export class Trie2 {
  prefix: { [key: string]: any }
  constructor() {
    this.prefix = {}
  }

  insert(word: string): void {
    let node = this.prefix
    for (const ch of word) {
      if (!node[ch]) {
        node[ch] = {}
      }
      node = node[ch]
    }
    node.isEnd = true
  }

  search(word: string): boolean {
    const node: any = this.searchPrefix(word)
    return !!(node !== undefined && node.isEnd)
  }

  searchPrefix(prefix: string) {
    let node = this.prefix
    for (const ch of prefix) {
      if (!node[ch]) {
        return false
      }
      node = node[ch]
    }
    return node
  }

  startsWith(word: string): boolean {
    return !!this.searchPrefix(word)
  }
}
