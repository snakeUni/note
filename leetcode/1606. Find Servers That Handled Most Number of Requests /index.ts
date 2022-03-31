export function busiestServers(
  k: number,
  arrival: number[],
  load: number[]
): number[] {
  // 可以储存每台服务器的忙碌时间，以及请求个数
  const hashMap = new Map<number, { request: number; time: number[] }>()
  new Array(k).fill(0).forEach((_v, index) => {
    hashMap.set(index, { request: 0, time: [0, 0] })
  })
  const getFreeServerIndex = (startTime: number, i: number) => {
    let curK = -1
    const cur = i % k
    const curRequest = hashMap.get(cur)
    if (curRequest && startTime >= curRequest.time[1]) {
      return cur
    }

    for (const [index, v] of hashMap) {
      if (startTime >= v.time[1]) {
        curK = index
        break
      }
    }

    return curK
  }
  for (let i = 0; i < arrival.length; i++) {
    // 判断当前是否是空闲
    const curFreeServerIndex = getFreeServerIndex(arrival[i], i)
    // 如果没有空闲 drop 掉
    if (curFreeServerIndex === -1) {
      continue
    } else {
      const preV = hashMap.get(curFreeServerIndex)!
      hashMap.set(curFreeServerIndex, {
        request: preV?.request + 1,
        time: [arrival[i], arrival[i] + load[i]]
      })
    }
  }

  let maxRequest = 0,
    maxServer = []

  for (const [_index, v] of hashMap) {
    maxRequest = Math.max(v.request, maxRequest)
  }

  for (const [index, v] of hashMap) {
    if (v.request === maxRequest) {
      maxServer.push(index)
    }
  }

  return maxServer
}
