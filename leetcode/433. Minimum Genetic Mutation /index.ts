export function minMutation(
  start: string,
  end: string,
  bank: string[]
): number {
  const cnt = new Set()
  const visited = new Set()
  const keys = ['A', 'C', 'G', 'T']
  for (const w of bank) {
    cnt.add(w)
  }
  if (start === end) {
    return 0
  }
  if (!cnt.has(end)) {
    return -1
  }
  const queue = [start]
  visited.add(start)
  let step = 1
  while (queue.length) {
    const sz = queue.length
    for (let i = 0; i < sz; i++) {
      const curr = queue.shift() as string
      for (let j = 0; j < 8; j++) {
        for (let k = 0; k < 4; k++) {
          if (keys[k] !== curr[j]) {
            const sb = [...curr]
            sb[j] = keys[k]
            const next = sb.join('')
            if (!visited.has(next) && cnt.has(next)) {
              if (next === end) {
                return step
              }
              queue.push(next)
              visited.add(next)
            }
          }
        }
      }
    }
    step++
  }
  return -1
}
