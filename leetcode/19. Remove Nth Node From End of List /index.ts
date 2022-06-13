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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // 使用两个指针来解决
  const dummy = new ListNode(0, head)
  let first = head
  // 指向  dummy 节点，保证遍历完下一个节点即是删除的节点
  let second: any = dummy

  for (let i = 0; i < n; i++) {
    // 更新节点信息
    first = (first as ListNode).next
  }

  while (first !== null) {
    first = first.next
    second = second.next
  }

  // 删除下一个节点
  second.next = second.next.next
  const ans = dummy.next
  return ans
}
