// Construct a RowManager instance with the specified number of cells.
function CAGrid(width, height, rule, intial, off, on) {

  const ca = new CellularAutomata(rule)
  
  const initial = Array(width).fill(0)
  intial.forEach(val => { if (val > -1 && val < width) initial[val] = 1 })

  let currentRow = initial
  let draw = function (context) {
    let rowIndex = 1
    while (rowIndex < height) {
      let newRow = ca.EvolveRow(currentRow)
      newRow.forEach((cell, index, row) => {
        if (cell === 1) context.fillRect(index, (rowIndex - 1) * 2, 1, 2)
      })
      currentRow = newRow
      rowIndex++
    }
  }
  
  this.Rule = ca.RuleSet()

  this.DrawGrid = function (context) {
    draw(context)
  }
}