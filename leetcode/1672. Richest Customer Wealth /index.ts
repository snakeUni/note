export function maximumWealth(accounts: number[][]): number {
  let max = 0
  for (let i = 0; i < accounts.length; i++) {
    const sum = accounts[i].reduce((acc, cur) => acc + cur, 0)
    max = Math.max(max, sum)
  }

  return max
}
