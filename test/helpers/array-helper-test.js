const assert = require('assert')
const path = require('path')

const ArrayHelper = require(path.resolve('src/helpers/array-helper'))

describe('ArrayHelper', function () {
  describe('remove', function () {
    it('should return array without specified element', function () {
      try {
        const arrayCase = [ 1, 2, 3, 4 ]
        const elementToRemove = 4
        const result = ArrayHelper.remove(arrayCase, elementToRemove)

        assert.ok(!result.includes(elementToRemove))
      } catch (error) {
        assert.ok(false)
      }
    })

    it('should not throw error if element does not exist', function () {
      try {
        const arrayCase = [ 1, 2, 3, 4 ]
        const elementToRemove = 5
        const result = ArrayHelper.remove(arrayCase, elementToRemove)

        assert.ok(!result.includes(elementToRemove))
      } catch (error) {
        assert.ok(false)
      }
    })
  })

  describe('add', function () {
    it('should add respective element', function () {
      try {
        const arrayCase = [ 1, 2, 3, 4 ]
        const elementToAdd = 5
        const result = ArrayHelper.add(arrayCase, elementToAdd)

        assert.ok(result.includes(elementToAdd))
      } catch (error) {
        assert.ok(false)
      }
    })

    it('should add element even if is duplicate', function () {
      try {
        const arrayCase = [ 4 ]
        const elementToAdd = 4
        const result = ArrayHelper.add(arrayCase, elementToAdd)

        assert.equal(result.length, 2)
      } catch (error) {
        assert.ok(false)
      }
    })
  })

  describe('addUnique', function () {
    it('should add respective element', function () {
      try {
        const arrayCase = [ 1, 2, 3, 4 ]
        const elementToAdd = 5
        const result = ArrayHelper.addUnique(arrayCase, elementToAdd)

        assert.ok(result.includes(elementToAdd))
      } catch (error) {
        assert.ok(false)
      }
    })

    it('should not add element if is duplicate', function () {
      try {
        const arrayCase = [ 4 ]
        const elementToAdd = 4
        const result = ArrayHelper.addUnique(arrayCase, elementToAdd)

        assert.equal(result.length, 1)
      } catch (error) {
        assert.ok(false)
      }
    })
  })

})

