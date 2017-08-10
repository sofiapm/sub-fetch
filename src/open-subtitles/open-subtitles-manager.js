/**
 * Module dependencies.
 */

const path = require('path')
const request = require('request')

const parser = require('episode-parser')
const auth = require(path.resolve('db/auth.json'))

const OS = require('opensubtitles-api')
const openSubtitles = new OS(auth.open_subtitles)

const fileManager = require(path.resolve('src/file/file-manager'))

/**
 * Export `AbstractManager`.
 */

class OpenSubtitlesManager {

  search (file, languageIds, callback) {
    const query = this.buildHashBestSearchObject(file, fileManager.hashFile(file.path), languageIds)

    openSubtitles
      .search(query)
      .then(subtitles => {
        this.processAllResonses(file.path, subtitles, (error, data) => {
          callback(error, { name: file.name, lang: data.lang })
        })
      }).catch((error) => {
        console.log(error)
        callback(error, file.name)
      })
  }

  buildHashBestSearchObject (file, hash, languageIds) {
    const data = parser(file.name)

    return {
      hash,
      filesize: file.size,
      path: file.path,
      filename: file.name,
      season: data.season,
      episode: data.episode,
      sublanguageid: languageIds
    }
  }

  processBestResponse (path, subtitles, callback) {
    const bestSub = this.findBestSubtitle(subtitles)
    if (bestSub) {
      this.requestSubtitle(bestSub.url, (error, data) => {
        if (!error) {
          fileManager.writeFile({ path }, data, (err, data) => {
            callback(err, data)
          })
        }
      })
    } else {
      callback('No subtitle found.', path)
    }
  }

  processAllResonses (path, subtitles, callback) {
    if (subtitles && Object.keys(subtitles).length > 0) {
      Object.entries(subtitles).forEach(([key, val]) => {
        this.requestSubtitle(val.url, (error, data) => {
          if (!error) {
            fileManager.writeFile({ path, lang: val.lang }, data, (err, res) => {
              callback(err, { lang: val.lang })
            })
          }
        })
      })
    } else {
      callback('No subtitle found.', path)
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

  findBestSubtitle (subtitles) {
    let best
    Object.entries(subtitles).forEach(([key, val]) => {
      best = best && best.score > val.score ? best : val
    })

    return best
  }
}

module.exports = new OpenSubtitlesManager()
