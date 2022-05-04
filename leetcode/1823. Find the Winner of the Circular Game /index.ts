function findTheWinner(n: number, k: number): number {
  const queue: number[] = []
  for (let i = 1; i <= n; i++) {
    queue.push(i)
  }
  while (queue.length > 1) {
    for (let i = 1; i < k; i++) {
      queue.push(queue.shift() as number)
    }
    queue.shift()
  }
  return queue[0]
}

// 约瑟夫问题求解
export function findTheWinner2(n: number, k: number): number {
  let winner = 1
  for (let i = 2; i <= n; i++) {
    winner = ((k + winner - 1) % i) + 1
  }
  return winner
}
