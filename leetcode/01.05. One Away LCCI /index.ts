// 可以使用双指针的形式
export function oneEditAway(first: string, second: string): boolean {
  const secondL = second.length
  const firstL = first.length
  if (firstL === secondL) {
    let count = 0
    for (let i = 0; i < firstL; i++) {
      if (first[i] !== second[i]) {
        count++
      }
    }
    return count <= 1
  } else if (firstL === secondL - 1) {
    // first 需要增加一个字符达到 second
    for (let i = 0; i < secondL; i++) {
      let tem = second.slice(0, i) + second.slice(i + 1)
      if (tem === first) {
        return true
      }
    }

    return false
  } else if (firstL === secondL + 1) {
    // first 需要增加一个字符达到 second
    for (let i = 0; i < firstL; i++) {
      let tem = first.slice(0, i) + first.slice(i + 1)
      if (tem === second) {
        return true
      }
    }

    return false
  }

  return false
}
