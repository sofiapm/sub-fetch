const config = require('config')
const assert = require('assert')
const path = require('path')

const fs = require('fs')
const UserDataManager = require(path.resolve('src/user-data/user-data-manager'))

describe('userDataManager', function () {
  const dirPath = config.get('test.user_data.dir')
  const filePath = path.join(dirPath, 'userdata.json')

  after(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('failed to delete local image:' + err)
      } else {
        console.log('successfully deleted local file')
      }
    })
  })

  describe('constructor', function () {
    it('should define default data', function () {
      try {
        const manager = new UserDataManager({ dir: dirPath })

        assert.equal(JSON.stringify(manager.data), '{}')
      } catch (error) {
        assert.ok(false)
      }
    })
  })

  describe('set', function () {
    it('should create new file if did not exist yet', function () {
      try {
        const manager = new UserDataManager({ dir: dirPath })

        manager.set('test_key', 'value_test')
        fs.readFileSync(filePath)
        assert.ok(true)
      } catch (error) {
        assert.ok(false)
      }
    })

    it('should create key/value entry', function () {
      try {
        const manager = new UserDataManager({ dir: dirPath })
        const key = 'test_key'
        manager.set(key, 'value_test')

        assert.equal(manager.data[key], 'value_test')
      } catch (error) {
        assert.ok(false)
      }
    })
  })

  describe('get', function () {
    it('should get value for respective key', function () {
      try {
        const manager = new UserDataManager({ dir: dirPath })
        const value = 'value_test'
        const key = 'key_test'

        assert.equal(manager.get(key), undefined)

        manager.set(key, value)

        assert.equal(manager.get(key), value)
      } catch (error) {
        assert.ok(false)
      }
    })
  })
})

