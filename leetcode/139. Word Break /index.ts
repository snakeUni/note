export function wordBreak(s: string, wordDict: string[]): boolean {
  const length = s.length
  const wordDictSet = new Set(wordDict)
  const dp = new Array(length + 1).fill(false)
  dp[0] = true

  for (let i = 1; i <= length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDictSet.has(s.substr(j, i - j))) {
        dp[i] = true
        break
      }
    }
  }

  return dp[length]
}
