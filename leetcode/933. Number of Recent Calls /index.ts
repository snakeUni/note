export class RecentCounter {
  res: number[] = []
  constructor() {
    this.res = []
  }

  ping(t: number): number {
    this.res.push(t)
    while (this.res[0] < t - 3000) {
      this.res.shift()
    }
    return this.res.length
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
