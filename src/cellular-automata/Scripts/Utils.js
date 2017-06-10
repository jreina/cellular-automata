// Some utilities for this project.

const Utils = {
  // Convert an integer to a binary represented by an array.
  ConvertIntToBinArray: function convertToBinArray(ar, remainder, index) {
    if (index === ar.length) return ar
    let powerOfTwo = Math.pow(2, ar.length - index - 1)
    ar[index] = remainder >= powerOfTwo ? 1 : 0
    return convertToBinArray(ar, remainder >= powerOfTwo ? remainder - powerOfTwo : remainder, index + 1)
  },

  // Return a copy of the object
  Copy: function (obj) {
    return Object
      .keys(obj)
      .reduce((memo, key) => { memo[key] = obj[key]; return memo }, {})
  }
}