const assert = require('assert')
const path = require('path')

const StringHelper = require(path.resolve('src/helpers/string-helper'))

describe('StringHelper', function () {
  describe('capitalizeFirstLetters', function () {
    it('should return first letters capitalized', function () {
      try {
        const stringCase = 'test string to be capitalized'
        const expectedResult = 'Test String To Be Capitalized'
        const result = StringHelper.capitalizeFirstLetters(stringCase)

        assert.equal(result, expectedResult)
      } catch (error) {
        assert.ok(false)
      }
    })

    it('should replace `_` and `-` for spaces and return first letters capitalized', function () {
      try {
        const stringCase = 'test string_to-be capitalized'
        const expectedResult = 'Test String To Be Capitalized'
        const result = StringHelper.capitalizeFirstLetters(stringCase)

        assert.equal(result, expectedResult)
      } catch (error) {
        assert.ok(false)
      }
    })
  })

  describe('lowercaseAllLetters', function () {
    it('should return all letters in lowercase, with words separated by `_`', function () {
      try {
        const stringCase = 'Test sTring,to_cHANGe-to, LOwerCase'
        const expectedResult = 'test_string_to_change_to_lowercase'
        const result = StringHelper.lowercaseAllLetters(stringCase)

        assert.equal(result, expectedResult)
      } catch (error) {
        assert.ok(false)
      }
    })
  })
})

