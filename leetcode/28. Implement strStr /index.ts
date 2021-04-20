export function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) return 0
  if (haystack.length < needle.length) return -1
  if (haystack.length === needle.length) {
    if (haystack === needle) return 0
    return -1
  }
  for (let k = 0; k <= haystack.length - needle.length; k++) {
    const target = haystack.slice(k, k + needle.length)
    if (target === needle) return k
  }

  return -1
}
