var minimumTimeRequired = function (jobs, k) {
  jobs.sort((a, b) => a - b)
  let low = 0,
    high = jobs.length - 1
  while (low < high) {
    const temp = jobs[low]
    jobs[low] = jobs[high]
    jobs[high] = temp
    low++
    high--
  }
  let l = jobs[0],
    r = jobs.reduce(function (prev, curr, idx, jobs) {
      return prev + curr
    })
  while (l < r) {
    const mid = Math.floor((l + r) >> 1)
    if (check(jobs, k, mid)) {
      r = mid
    } else {
      l = mid + 1
    }
  }
  return l
}

const check = (jobs, k, limit) => {
  const workloads = new Array(k).fill(0)
  return backtrack(jobs, workloads, 0, limit)
}

const backtrack = (jobs, workloads, i, limit) => {
  if (i >= jobs.length) {
    return true
  }
  let cur = jobs[i]
  for (let j = 0; j < workloads.length; ++j) {
    if (workloads[j] + cur <= limit) {
      workloads[j] += cur
      if (backtrack(jobs, workloads, i + 1, limit)) {
        return true
      }
      workloads[j] -= cur
    }
    // 如果当前工人未被分配工作，那么下一个工人也必然未被分配工作
    // 或者当前工作恰能使该工人的工作量达到了上限
    // 这两种情况下我们无需尝试继续分配工作
    if (workloads[j] === 0 || workloads[j] + cur === limit) {
      break
    }
  }
  return false
}
