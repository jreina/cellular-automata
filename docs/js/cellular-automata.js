// Defines the CellularAutomata rule set for a given number.
// Rule must be in the interval [0, 255]
function CellularAutomata(n) {
  const _rules = {}

  // An eight bit array representing the rule integer in binary
  let _ruleBinArray = Utils.ConvertIntToBinArray(Array(8).fill(0), n, 0)

  // Fill in the CA rules
  Array(8).fill(0)
    .map((num, index) => { return Utils.ConvertIntToBinArray([0, 0, 0], index, 0) })
    .reduce((memo, binArray, binArrayIndex) => {
      memo[binArray] = _ruleBinArray[_ruleBinArray.length - binArrayIndex - 1] === 1
      return memo
    }, _rules)

  // Check a given array against the rule set.
  this.Check = function Check(ar) {
    if (ar.length !== 3) throw new Error("Array must have three indices to be checked.")
    return _rules[ar]
  }

  // Return a copy of the rule object being used.
  this.RuleSet = function () {
    return Utils.Copy(_rules)
  }

  this.EvolveRow = function(row) {
      return row.map((cell, index, ar) => {
        let checkRow
        if (index === 0) checkRow = [ar[ar.length - 1], cell, ar[index + 1]]
        else if (index === ar.length - 1) checkRow = [ar[index - 1], cell, ar[0]]
        else checkRow = [ar[index - 1], cell, ar[index + 1]]
        return this.Check(checkRow) ? 1 : 0
      })
  }
}
