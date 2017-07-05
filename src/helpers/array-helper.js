class ArrayHelper {

  /**
   * Remove element from array
   * @param {array} array - array which element will be removed
   * @param {object} element - element to be removed
   */

  remove (array, element) {
    var index = array.indexOf(element)
    if (index > -1) {
      array.splice(index, 1)
    }
    return array
  }

  /**
  * Add element to array
  * @param {array} array - array which element will be added
  * @param {object} element - element to be added
  */

  add (array, element) {
    array.push(element)
    return array
  }

  /**
  * Add element to array if is not already present
  * @param {array} array - array which element will be added
  * @param {object} element - element to be added
  */

  addUnique (array, element) {
    if (!array.includes(element)) {
      array.push(element)
    }
    return array
  }

  /**
   * Get elements at indexes
   */

  getAtIndexes (array, indexes) {
    const elements = []
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      if (element) elements.push(element)
    }
    return elements
  }
}

module.exports = new ArrayHelper()
