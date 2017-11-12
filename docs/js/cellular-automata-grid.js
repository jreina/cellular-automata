// Construct a RowManager instance with the specified number of cells.
function CAGrid(width, height, rule, initial, cellSize) {
  const ca = new CellularAutomata(rule);
  const rows = Array(height)
    .fill(0)
    .reduce(
      (memo, value) => {
        const a = memo.concat([ca.EvolveRow(memo[memo.length - 1])]);
        return a;
      },
      [initial]
    );
  const _draw = function(context) {
    rows.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 1)
          context.fillRect(
            cellIndex * cellSize,
            rowIndex * cellSize,
            cellSize,
            cellSize
          );
      });
    });
  };
  this.Rule = ca.RuleSet();

  this.DrawGrid = _draw;
}
