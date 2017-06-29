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
        {
          text: 'English',
          value: 'en'
        },
        {
          text: 'portuguese',
          value: 'pt'
        },
        {
          text: 'chinese',
          value: 'ch'
        }
      ]
      multiSelect.addOptions(optionsCase)

      assert.equal(multiSelectCase.options.count, optionsCase.count)
    } catch (error) {
      console.log(error.message)
      assert.ok(false)
    }
  })
})

