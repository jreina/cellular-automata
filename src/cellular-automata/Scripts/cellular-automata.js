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
      memo[binArray] = _ruleBinArray[binArrayIndex] === 1
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
}
