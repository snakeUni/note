export function plusOne(digits: number[]): number[] {
  let remain = 1
  let length = 0
  for (let i = digits.length - 1; i >= 0; i--) {
    if (remain === 1 && digits[i] + 1 === 10) {
      digits[i] = 0
    } else {
      digits[i] = digits[i] + 1
      remain = 0
      break
    }
  }

  if (remain === 0) {
    return digits
  }
  digits.unshift(1)
  return digits
}
