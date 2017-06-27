/**
 * Module dependencies.
 */

const path = require('path')
const auth = require(path.resolve('config/auth.json'))

const OS = require('opensubtitles-api')
const openSubtitles = new OS(auth.open_subtitles)

/**
 * Export
 */

module.exports = class OpenSubtitlesUserManager {

  constructor (username, password) {
    if (!username || !password) throw Error('Missing credentials')
    this.auth = {
      username,
      password,
      useragent: auth.open_subtitles.useragent
    }
  }

  login (successcallback, errorcallback) {
    openSubtitles.api.LogIn(this.auth.username, this.auth.password, 'en', this.auth.useragent)
                    .then(res => {
                      if (res.status === '200 OK' && res.data) {
                        successcallback(res.token)
                      } else {
                        throw Error(res.status)
                      }
                    })
                    .catch(error => errorcallback('Login Error', error.message))
  }

  logout (token, successcallback, errorcallback) {
    openSubtitles.api.LogOut(token)
                      .then(res => {
                        if (res.status === '200 OK') {
                          successcallback()
                        } else {
                          throw Error(res.status)
                        }
                      })
                      .catch(error => errorcallback('Logout Error', error.message))
  }
}
