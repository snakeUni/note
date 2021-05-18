export function countTriplets(arr: number[]): number {
  // 根据异或的交换原则，可以知道 arr[i] ^ arr[i + 1] .. ^ arr[j - 1] ^ arr[j] ^ ....arr[k] = 0
  // 所以只需要求i, k 即可知道
  let total = 0
  for (let i = 0; i < arr.length - 1; i++) {
    for (let k = i + 1; k < arr.length; k++) {
      const v = arr.slice(i, k + 1)
      const xorV = v.reduce((acc, cur) => {
        return acc ^ cur
      }, 0)

      if (xorV == 0) {
        total += k - i
      }
    }
  }

  return total
}
