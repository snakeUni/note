// 一次循环，双指针
export function isPalindrome(s: string): boolean {
  const regx = /[a-zA-Z0-9]/
  let left = 0,
    right = s.length - 1
  while (left < right) {
    while (left < right && !regx.test(s[left])) {
      ++left
    }
    while (left < right && !regx.test(s[right])) {
      --right
    }
    if (left < right) {
      if (s[left].toLowerCase() != s[right].toLowerCase()) {
        return false
      }
      ++left
      --right
    }
  }
  return true
}
