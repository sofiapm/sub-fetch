/**
 * Module dependencies.
 */

const config = require('config')
const OS = require('opensubtitles-api')
const parser = require('episode-parser')
const request = require('request')

const openSubtitles = new OS(config.get('open_subtitles.user_agent'))
const fileManager = require('../file/file-manager')

/**
 * Export `AbstractManager`.
 */

class OpenSubtitlesManager {

  search (file, callback) {
    const query = this.buildHashBestSearchObject(file, fileManager.hashFile(file.path))

    openSubtitles
            .search(query)
            .then(subtitles => {
              this.processBestResponse(file.path, subtitles, (error, data) => {
                callback(error, file.name)
              })
            }).catch((error) => {
              console.log(error)
              callback(error, file.name)
            })
  }

  buildHashBestSearchObject (file, hash) {
    const data = parser(file.name)

    return {
      hash,
      filesize: file.size,
      path: file.path,
      filename: file.name,
      season: data.season,
      episode: data.episode

            // limit: '5',                 //Default returns the best
            // query: data.name,             // Text-based query, this is not recommended.
            // gzip: true                  // returns url to gzipped subtitles, defaults to false
    }
  }

  processBestResponse (path, subtitles, callback) {
    if (subtitles['en']) {
      this.requestSubtitle(subtitles['en'].url, (error, data) => {
        if (!error) {
          fileManager.writeFile(path, data, (err, data) => {
            callback(err, data)
          })
        }
      })
    } else {
      console.log('no subtitle found')
    }
  }

  requestSubtitle (url, callback) {
    request({
      url,
      encoding: null
    }, (error, res, buffer) => {
      return callback(error, buffer)
    })
  }
}

module.exports = new OpenSubtitlesManager()
