export function numRabbits(answers: number[]): number {
  if (answers.length === 0) return 0

  // 去重，因为如果存在相同数字都可以是这个颜色里面的兔子说的话，比如有
  // 11 只蓝色兔子，可以是 [10, 10, ...10] 每一种都是其中的一只说的话，当然此时
  // 就是最少的，因为每一只兔子都这么说了。但是如果有 12 只说了这样的话，那么最后一个 10
  // 必定是其他颜色，因为重复的最多有 11 只。
  const newAnswers: { [key: string]: number[] } = {}

  for (let i = 0; i < answers.length; i++) {
    const key = answers[i]
    if (!newAnswers[key]) {
      newAnswers[key] = [key]
    } else {
      newAnswers[key].push(key)
    }
  }

  // 对对象中的数组进行合并处理即可
  let t = 0
  Object.keys(newAnswers).forEach(k => {
    console.log(k, newAnswers[k].length)
    t = t + Math.ceil(newAnswers[k].length / (Number(k) + 1)) * (Number(k) + 1)
  })

  console.log(t)

  return t
}
