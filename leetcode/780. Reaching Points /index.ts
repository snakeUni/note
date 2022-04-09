// https://leetcode-cn.com/problems/reaching-points/solution/
export function reachingPoints(
  sx: number,
  sy: number,
  tx: number,
  ty: number
): boolean {
  if (tx < sx || ty < sy) return false
  while (tx > sx && ty > sy && tx !== ty) {
    if (tx > ty) {
      tx %= ty
    } else {
      ty %= tx
    }
  }

  if (tx === sx && ty === sy) {
    return true
  } else if (tx === sx) {
    return ty > sy && (ty - sy) % tx === 0
  } else if (ty === sy) {
    return tx > sx && (tx - sx) % ty === 0
  } else {
    return false
  }
}
