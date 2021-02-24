const assert = require('assert')

// fork from react 最小堆
function push(heap, node) {
  const index = heap.length
  heap.push(node)
  shiftUp(heap, node, index)
}

function peek(heap) {
  const first = heap[0]
  return first === undefined ? null : first
}

function pop(heap) {
  const first = heap[0]

  if (first !== undefined) {
    // move last to top
    const last = heap.pop()

    if (last !== first) {
      heap[0] = last
      shiftDown(heap, last, 0)
    }

    return first
  } else {
    return null
  }
}

function update(heap, index, nextNode) {
  const current = heap[index]

  if (current) {
    heap.splice(index, 1)
    push(heap, nextNode)
  }
}

function shiftUp(heap, node, i) {
  let index = i

  while (true) {
    const parentIndex = (index - 1) >>> 1
    const parent = heap[parentIndex]

    if (parent !== undefined && compare(parent, node) > 0) {
      // the parent is larger, swap positions
      heap[parentIndex] = node
      heap[index] = parent
      index = parentIndex
    } else {
      return
    }
  }
}

function shiftDown(heap, node, i) {
  let index = i
  const length = heap.length

  while (index < length) {
    // left index
    const leftIndex = (index + 1) * 2 - 1
    const left = heap[leftIndex]
    const rightIndex = leftIndex + 1
    const right = heap[rightIndex]

    // If the left or right node is smaller, swap with smaller of those.
    if (left !== undefined && compare(left, node) < 0) {
      if (right !== undefined && compare(right, node) < 0) {
        heap[index] = right
        heap[rightIndex] = node
        index = rightIndex
      } else {
        heap[index] = left
        heap[leftIndex] = node
        index = leftIndex
      }
    } else if (right !== undefined && compare(right, node) < 0) {
      heap[index] = right
      heap[rightIndex] = node
      index = rightIndex
    } else {
      // Neither child is smaller. Exit
      return
    }
  }
}

function compare(preNode, curNode) {
  // Compare sort index first, then task id.
  const diff = preNode.sortIndex - curNode.sortIndex
  return diff !== 0 ? diff : preNode.id - curNode.id
}

/**
 * ----------------------------------------------------------------
 * 测试 heap
 */

const heap = [
  { id: 123, sortIndex: 10 },
  { id: 123, sortIndex: 8 }
]

// test push
push(heap, { id: 321, sortIndex: 2 })

assert.deepEqual(heap, [
  { id: 321, sortIndex: 2 },
  { id: 123, sortIndex: 8 },
  { id: 123, sortIndex: 10 }
])

// test pop
const popNode = pop(heap)

console.log(popNode)

assert.deepEqual(popNode, { id: 321, sortIndex: 2 })
assert.deepEqual(heap, [
  { id: 123, sortIndex: 8 },
  { id: 123, sortIndex: 10 }
])

// test update
update(heap, 0, { id: 432, sortIndex: 19 })
assert.deepEqual(heap, [
  { id: 123, sortIndex: 10 },
  { id: 432, sortIndex: 19 }
])

// test peek
const peekNode = peek(heap)
console.log('peekNode:', peekNode)
assert.deepEqual(peekNode, { id: 123, sortIndex: 10 })
