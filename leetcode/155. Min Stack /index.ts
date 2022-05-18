class MinStack {
  stack: number[] = []
  // 辅助栈
  min_stack: number[] = [Infinity]
  constructor() {}

  push(val: number): void {
    this.stack.push(val)
    this.min_stack.push(
      Math.min(this.min_stack[this.min_stack.length - 1], val)
    )
  }

  pop(): void {
    this.stack.pop()
    this.min_stack.pop()
  }

  top(): number {
    return this.stack[this.stack.length - 1]
  }

  getMin(): number {
    return this.min_stack[this.min_stack.length - 1]
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
