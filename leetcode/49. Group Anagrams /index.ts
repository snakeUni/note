export function groupAnagrams(strs: string[]): string[][] {
  const map = new Map()
  for (let str of strs) {
    let array = Array.from(str)
    array.sort()
    let key = array.toString()
    let list = map.get(key) ? map.get(key) : new Array()
    list.push(str)
    map.set(key, list)
  }
  return Array.from(map.values())
}
