export function selfDividingNumbers(left: number, right: number): number[] {
  // 取整数每位数的方法就是对整数进行 % 10，比如 122，顺序是 2,2,1
  const isSelfDividing = (num: number) => {
    let tem = num

    while (tem > 0) {
      let digit = tem % 10
      // 不满足自然数的条件
      if (digit === 0 || num % digit !== 0) {
        return false
      }
      tem = Math.floor(tem / 10)
    }

    return true
  }

  const ans = []
  for (let i = left; i <= right; i++) {
    if (isSelfDividing(i)) {
      ans.push(i)
    }
  }
  return ans
}
