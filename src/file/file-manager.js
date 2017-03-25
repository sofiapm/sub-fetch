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

  writeFile (path, buffer) {
    const subtitlePath = this.getSubtitlePath(path)

    console.log('Path: ' + subtitlePath)
    fs.writeFile(subtitlePath, buffer.toString(), function (err, data) {
      if (err) {
        console.log(err)
        return false
      }

      console.log('The file was saved!')
      return true
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
