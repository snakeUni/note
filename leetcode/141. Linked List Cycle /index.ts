/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function hasCycle(head: ListNode | null): boolean {
  if (!head) return false
  const set = new Set()

  while (head !== null) {
    if (!set.has(head)) {
      set.add(head)
    } else {
      return true
    }
    head = head.next
  }

  return false
}
