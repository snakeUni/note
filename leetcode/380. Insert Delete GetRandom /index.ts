export class RandomizedSet {
  vec: Set<number>
  constructor() {
    this.vec = new Set()
  }

  insert(val: number): boolean {
    if (this.vec.has(val)) return false
    this.vec.add(val)
    return true
  }

  remove(val: number): boolean {
    if (this.vec.has(val)) {
      this.vec.delete(val)
      return true
    }

    return false
  }

  getRandom(): number {
    return [...this.vec][Math.floor(Math.random() * this.vec.size)]
  }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
