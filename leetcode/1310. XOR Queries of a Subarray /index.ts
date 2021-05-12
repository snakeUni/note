export function xorQueries(arr: number[], queries: number[][]): number[] {
  const res = []
  for (let i = 0; i < queries.length; i++) {
    const query = arr.slice(queries[i][0], queries[i][1] + 1)
    res.push(
      query.reduce((acc, cur) => {
        return acc ^ cur
      }, 0)
    )
  }

  return res
}
