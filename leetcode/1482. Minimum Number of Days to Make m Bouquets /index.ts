export function minDays(bloomDay: number[], m: number, k: number): number {
  const canMake = (bloomDay: number[], days: number, m: number, k: number) => {
    let bouquets = 0
    let flowers = 0
    const length = bloomDay.length
    for (let i = 0; i < length && bouquets < m; i++) {
      if (bloomDay[i] <= days) {
        flowers++
        if (flowers == k) {
          bouquets++
          flowers = 0
        }
      } else {
        flowers = 0
      }
    }
    return bouquets >= m
  }

  if (k * m > bloomDay.length) {
    return -1
  }
  let low = 1,
    high = 1
  const length = bloomDay.length
  for (let i = 0; i < length; i++) {
    high = Math.max(high, bloomDay[i])
  }
  while (low < high) {
    const days = Math.floor((high - low) / 2) + low
    if (canMake(bloomDay, days, m, k)) {
      high = days
    } else {
      low = days + 1
    }
  }
  return low
}
