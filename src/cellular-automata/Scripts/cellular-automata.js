// Defines the CellularAutomata rule set for a given number.
// Rule must be in the interval [0, 255]
function CellularAutomata(n) {
  const _rules = {}

  // Convert a number to binary represented by an array.
  let _convertToBinArray = function _convertToBinArray(ar, remainder, index) {
    if (index === ar.length) return ar
    let powerOfTwo = Math.pow(2, ar.length - index - 1)
    ar[index] = remainder >= powerOfTwo ? 1 : 0
    return _convertToBinArray(ar, remainder >= powerOfTwo ? remainder - powerOfTwo : remainder, index + 1)
  }

  // An eight bit array representing the rule integer in binary
  let _ruleBinArray = _convertToBinArray(Array(8).fill(0), n, 0)

  // Fill in the CA rules
  Array(8).fill(0)
    .map((num, index) => {
      return _convertToBinArray([0, 0, 0], index, 0)
    }) // [ [0,0,0], [0,0,1], ... ]
    .reduce((memo, binArray, binArrayIndex) => {
      memo[binArray] = _ruleBinArray[binArrayIndex] === 1
      return memo
    }, _rules)

  this.Check = function Check(ar) {
    if (ar.length !== 3) throw new Error("Array must have three indices to be checked.")
    return _rules[ar]
  }
}
