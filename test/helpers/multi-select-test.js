const assert = require('assert')
const path = require('path')
const jsdom = require('mocha-jsdom')

const MultiSelect = require(path.resolve('src/html-elements/multi-select'))

describe('MultiSelect', function () {
  jsdom()

  it('should create select', function () {
    try {
      const multiSelect = new MultiSelect()
      const multiSelectCase = multiSelect.getSelect()

      assert.equal(multiSelectCase.nodeName, 'SELECT')
    } catch (error) {
      console.log(error.message)
      assert.ok(false)
    }
  })

  it('should add options to select', function () {
    try {
      const multiSelect = new MultiSelect()
      const multiSelectCase = multiSelect.getSelect()
      const optionsCase = [
        'English',
        'portuguese',
        'chinese'
      ]
      multiSelect.addOptions(optionsCase)

      assert.equal(multiSelectCase.options.count, optionsCase.count)
    } catch (error) {
      console.log(error.message)
      assert.ok(false)
    }
  })
})

