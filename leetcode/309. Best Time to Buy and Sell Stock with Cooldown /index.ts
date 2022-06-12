// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/zui-jia-mai-mai-gu-piao-shi-ji-han-leng-dong-qi-4/
export function maxProfit(prices: number[]): number {
  if (prices.length === 0) return 0

  const len = prices.length
  let f0 = -prices[0],
    f1 = 0,
    f2 = 0
  for (let i = 1; i < len; i++) {
    let nextF0 = Math.max(f0, f2 - prices[i])
    let nextF1 = f0 + prices[i]
    let nextF2 = Math.max(f1, f2)
    f0 = nextF0
    f1 = nextF1
    f2 = nextF2
  }

  return Math.max(f1, f2)
}
