// Construct a RowManager instance with the specified number of cells.
function CAGrid(width, height, rule, intial, off, on) {

  const grid = [Array(width).fill(0)]
  const ca = new CellularAutomata(rule)
  let offChar = off || '#';
  let onChar = on || '_';
  let gridString = '';
  const initial = Array(width).fill(0)
  intial.forEach(val => { if (val > -1 && val < width) initial[val] = 1 })
  let currentRow = initial

  for (let i = 1; i < height; i++) {
    let newRow = ca.EvolveRow(currentRow)
    gridString += newRow.map(cell => cell === 1 ? onChar : offChar).join('') + '<br />'
    currentRow = newRow
  }
  this.Grid = function () {
    return grid
  }
  this.Rule = ca.RuleSet()
  this.GridText = function (off, on) {
    return grid.reduce((rowMemo, row) => rowMemo + row.map(cell => cell === 1 ? onChar : offChar).join('') + '<br />', '')
  }
  this.GridString = function () {
    return gridString
  }
}