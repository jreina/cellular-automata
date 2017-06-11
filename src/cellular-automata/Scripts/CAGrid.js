// Construct a RowManager instance with the specified number of cells.
function CAGrid(width, height, rule, intial) {
  
  const grid = [Array(width).fill(0)]
  const ca = new CellularAutomata(rule)

  intial.forEach(val => { if (val > -1 && val < width) grid[0][val] = 1 })
  for (let i = 1; i < height; i++) {
      grid.push(ca.EvolveRow(grid[i - 1]))
  }
  this.Grid = function () {
    return grid
  }
  this.Rule = ca.RuleSet()
  this.GridText = function(off, on) {
      let offChar = off || '#';
      let onChar = on || '_';
      return grid.reduce((rowMemo, row) => rowMemo + row.map(cell => cell === 1 ? onChar : offChar).join('') + '<br />', '')
  }
}