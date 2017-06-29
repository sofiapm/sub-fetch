const path = require('path')
const stringHelper = require(path.resolve('src/helpers/string-helper'))
const arrayHelper = require(path.resolve('src/helpers/array-helper'))

class MultipleSelectManager {
  constructor () {
    this.selectedIndexes = []

    this.select = document.createElement('select')
    this.select.multiple = true
    this.select.size = 5
    this.select.addEventListener('change', (event) => {
      this.selectMultiple(event.srcElement.selectedIndex)
    })
  }

  /**
   * Get select object
   */

  getSelect () {
    return this.select
  }

  /**
   * Add Options on select object
   * @param {array} options - Options to include on multi select
   */

  addOptions (options) {
    for (var i = 0; i < options.length; i++) {
      const option = this.createOption(stringHelper.lowercaseAllLetters(options[i]), stringHelper.capitalizeFirstLetters(options[i]))
      this.select.add(option)
    }
  }

  /**
   * Creates option element
   * @param {string} value - option value
   * @param {string} text - option text to be presented for user
   */

  createOption (value, text) {
    const option = document.createElement('option')
    option.value = value
    option.text = text

    return option
  }

  /**
   * Select multiple options
   * @param {integer} clickedIndex - index of element clicked
   */

  selectMultiple (clickedIndex) {
    this.manageSelectedArray(clickedIndex)

    for (var i = 0; i < this.select.children.length; i++) {
      this.select.children[i].selected = this.isSelected(i)
    }
  }

  /**
  * Verifies if index is selected
  * @param {integer} index - index to verify if is present on `selectedIndexes` array
  */

  isSelected (index) {
    return this.selectedIndexes.includes(index)
  }

  /**
   * Manage selected index array
   * If is selected now, adds to array, if not, removes from array
   * @param {integer} clickedIndex - index of element clicked
   */

  manageSelectedArray (clickedIndex) {
    this.isSelected(clickedIndex)
        ? arrayHelper.remove(this.selectedIndexes, clickedIndex)
        : arrayHelper.addUnique(this.selectedIndexes, clickedIndex)
  }

  /**
   * Get list of selected options
   */

  getSelectedOptions () {
    return this.selectedIndexes
  }
}

module.exports = MultipleSelectManager
