export function projectionArea(grid: number[][]): number {
  let xy = 0,
    yz = 0,
    zx = 0

  for (let i = 0; i < grid.length; i++) {
    const curGrid = grid[i]

    let maxX = 0,
      maxY = 0
    for (let k = 0; k < grid.length; k++) {
      maxX = Math.max(maxX, grid[i][k])
      maxY = Math.max(maxY, grid[k][i])
      xy += curGrid[k] === 0 ? 0 : 1
    }

    yz += maxX
    zx = zx + maxY
  }

  return xy + yz + zx
}
