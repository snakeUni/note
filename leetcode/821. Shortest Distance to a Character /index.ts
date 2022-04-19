export function shortestToChar(s: string, c: string): number[] {
  const answer = []
  const answerE = []
  let k = 0 // 代表过了第几个 e
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      answerE.push(i)
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      answer.push(0)
      // 到了下一个 e
      k++
    } else {
      answer.push(
        Math.min(
          Math.abs(i - answerE[k === answerE.length ? answerE.length - 1 : k]),
          Math.abs(i - answerE[k - 1 < 0 ? 0 : k - 1])
        )
      )
    }
  }

  return answer
}
