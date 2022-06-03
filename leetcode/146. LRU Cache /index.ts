// https://leetcode.cn/problems/lru-cache/solution/lruhuan-cun-ji-zhi-by-leetcode-solution/
// 更好的方法是可以使用链表
class LRUCache {
  hashMap: Map<number, number>
  queue: number[]
  capacity: number
  constructor(capacity: number) {
    // 使用 hashMap 存储，同时维护一个队列，最近使用的放到最前面，
    this.hashMap = new Map()
    this.queue = []
    this.capacity = capacity
  }

  sortQueue(key: number) {
    this.queue.splice(this.queue.indexOf(key), 1)
    this.queue.unshift(key)
  }

  get(key: number): number {
    const exist = this.hashMap.has(key)
    if (exist) {
      this.sortQueue(key)
      return this.hashMap.get(key) as number
    }

    return -1
  }

  put(key: number, value: number): void {
    const exist = this.hashMap.has(key)

    if (exist) {
      this.sortQueue(key)
      this.hashMap.set(key, value)
    } else {
      // 容量满了
      if (this.queue.length === this.capacity) {
        const last = this.queue.pop() as number
        this.queue.unshift(key)
        this.hashMap.delete(last)
        this.hashMap.set(key, value)
      } else {
        this.queue.unshift(key)
        this.hashMap.set(key, value)
      }
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
