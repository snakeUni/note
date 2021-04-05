/**
 Do not return anything, modify nums1 in-place instead.
 */
export function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  // 删除 num1 后面的几个数字
  nums1.splice(m)
  nums1.push(...nums2)
  nums1.sort((a, b) => (a - b < 0 ? -1 : 1))
}
