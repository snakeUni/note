/**
 * @param {number} N
 * @return {number}
 */
export const clumsy = (N: number): number => {
  // 四个数字为一组，进行分组, 每组之间都是用减号连接
  let temporary = []
  let index = 0
  let num = []
  for (let i = N; i > 0; i--) {
    temporary.push(i)
    index++

    if (index % 4 === 0) {
      num.push(temporary)
      temporary = []
    }
  }

  if (temporary.length) {
    // 存在非整除的
    num.push(temporary)
  }

  let total = 0

  for (let k = 0; k < num.length; k++) {
    const cur = num[k]

    if (cur.length === 4) {
      if (k === 0) {
        total = total + Math.floor((cur[0] * cur[1]) / cur[2]) + cur[3]
      } else {
        total = total - (Math.floor((cur[0] * cur[1]) / cur[2]) - cur[3])
      }
    } else {
      if (cur.length === 3) {
        total =
          k === 0
            ? total + Math.floor((cur[0] * cur[1]) / cur[2])
            : total - Math.floor((cur[0] * cur[1]) / cur[2])
      }

      if (cur.length === 2) {
        total = k === 0 ? total + cur[0] * cur[1] : total - cur[0] * cur[1]
      }

      if (cur.length === 1) {
        total = k === 0 ? total + cur[0] : total - cur[0]
      }
    }
  }

  return total
}
