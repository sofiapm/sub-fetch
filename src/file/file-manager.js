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

  writeFile (fileData, buffer, callback) {
    const subtitlePath = this.getSubtitlePath(fileData.path, fileData.lang)

    fs.writeFile(subtitlePath, buffer.toString(), function (err, data) {
      if (err) {
        console.log(err)
      }

      callback(err, data)
    })
  }

  getSubtitlePath (path, language) {
    const extension = this.getExtension(path)
    const newExtensionWithLang = language ? `srt.${language}` : 'srt'
    return path.split('.')
      .reverse()
      .join('.')
      .replace(extension, newExtensionWithLang)
      .split('.')
      .reverse()
      .join('.')
  }

  getExtension (path) {
    return path.split('.').pop()
  }
}

module.exports = new FileManager()
