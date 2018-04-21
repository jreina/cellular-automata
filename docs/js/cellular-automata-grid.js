// Construct a RowManager instance with the specified number of cells.
function CAGrid(width, height, rule, initial, cellSize, context) {
  const ca = new CellularAutomata(rule);

  this.Draw = context => {
    let currRow = initial;
    for (let row = 0; row < height + 1; row++) {
      for (let col = 0; col < width + 1; col++) {
        let currCell = currRow[col];
        if (currCell === 1)
          setTimeout(
            () =>
              context.fillRect(
                col * cellSize,
                row * cellSize,
                cellSize,
                cellSize
              ),
            Math.floor(Math.random() * 1500)
          );
      }
      currRow = ca.EvolveRow(currRow);
    }
  };

  this.Rule = ca.RuleSet();
}
