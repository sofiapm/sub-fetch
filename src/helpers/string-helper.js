class StringHelper {

  /**
   * Removes `_` to spaces and capitalizes first letters
   * @param {string} str - String to be capitalized
   */

  capitalizeFirstLetters (str) {
    const subStrings = str.split(/-|_| /g)
    for (var i = 0; i < subStrings.length; i++) {
      const firstLetter = subStrings[i].charAt(0).toUpperCase()
      subStrings[i] = firstLetter + subStrings[i].substr(1)
    }
    return subStrings.join(' ')
  }

   /**
   * Convert string to lowercase with `_` separating words
   * @param {string} str - String to be converted to lower case
   */

  lowercaseAllLetters (str) {
    const lowercase = str.toLowerCase()
    return lowercase.replace(/-|, |,| /g, '_')
  }
}

module.exports = new StringHelper()
