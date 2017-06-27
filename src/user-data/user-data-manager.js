const electron = require('electron')
const path = require('path')
const fs = require('fs')

class UserDataManager {
  constructor (options) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = options.dir || (electron.app || electron.remote.app).getPath('userData')
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, 'userdata.json')

    this.data = parseDataFile(this.path, {})
  }

  // This will just return the property on the `data` object
  get (key) {
    return this.data[key]
  }

  // This will set data
  set (key, val) {
    this.data[key] = val
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }

  // Set username and password properties
  setUsernamePassword (username, password) {
    this.set('username', username)
    this.set('password', password)
  }

  // Clean username and password properties
  cleanUsernamePassword () {
    this.set('username', undefined)
    this.set('password', undefined)
  }

  // Set token property
  setToken (token) {
    this.set('token', token)
  }

  // Clean Token property
  cleanToken () {
    this.set('token', undefined)
  }
}

function parseDataFile (filePath, defaults) {
  // First application run, files doe snot exist yet
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults
  }
}

// expose the class
module.exports = UserDataManager
