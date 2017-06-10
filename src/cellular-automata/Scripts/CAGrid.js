// Construct a RowManager instance with the specified number of cells.
function CAGrid(width, height, rule) {
    console.log(arguments)
  const grid = [Array(width).fill(0)]
  const ca = new CellularAutomata(rule)
  grid[0][width - 1] = 1
  for (let i = 1; i < height; i++) {
    grid.push( grid[i - 1]
      .map((cell, index, ar) => {
        let checkRow
        if (index === 0) checkRow = [0, cell, ar[index + 1]]
        else if (index === ar.length - 1) checkRow = [0, cell, ar[index + 1]]
        else checkRow = [ar[index - 1], cell, ar[index + 1]]
        return ca.Check(checkRow)? 1: 0
      }))
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