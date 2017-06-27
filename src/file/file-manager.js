/**
 * Module dependencies.
 */

const fs = require('fs')
const md5File = require('md5-file')

/**
 * Export `File Manager`.
 */

class FileManager {

  hashFile (path) {
    try {
      return md5File.sync(path)
    } catch (error) {
      console.log(error)
    }
  }

  writeFile (path, buffer, callback) {
    const subtitlePath = this.getSubtitlePath(path)

    fs.writeFile(subtitlePath, buffer.toString(), function (err, data) {
      if (err) {
        console.log(err)
      }

      callback(err, data)
    })
  }

  getSubtitlePath (path) {
    const extension = this.getExtension(path)
    return path.split('.')
        .reverse()
        .join('.')
        .replace(extension, 'srt')
        .split('.')
        .reverse()
        .join('.')
  }

  getExtension (path) {
    return path.split('.').pop()
  }
}

module.exports = new FileManager()
