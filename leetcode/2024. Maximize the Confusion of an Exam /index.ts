export function maxConsecutiveAnswers(answerKey: string, k: number): number {
  return Math.max(
    maxConsecutiveChar(answerKey, k, 'T'),
    maxConsecutiveChar(answerKey, k, 'F')
  )
}

// 最长字符串用的最多的就是滑动窗口，保证内部只有不超过 k 个不同的字符即可，如果超过了，则左边窗口移动位置，确保不超过为止。
export function maxConsecutiveChar(answerKey: string, k: number, ch: string) {
  const n = answerKey.length
  let ans = 0
  for (let left = 0, right = 0, sum = 0; right < n; right++) {
    sum += answerKey.charAt(right) !== ch ? 1 : 0
    console.log('sum:', sum)
    while (sum > k) {
      sum -= answerKey[left++] !== ch ? 1 : 0
    }
    ans = Math.max(ans, right - left + 1)
  }
  return ans
}
