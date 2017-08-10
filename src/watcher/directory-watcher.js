const chokidar = require('chokidar')
const path = require('path')
const fileManager = require(path.resolve('src/file/file-manager.js'))
const subtitlesManager = require(path.resolve('src/open-subtitles/open-subtitles-manager'))
const UserDataManager = require(path.resolve('src/user-data/user-data-manager'))
const userDataManager = new UserDataManager()

class DirWatcher {

  constructor (path) {
    this.watcher = chokidar.watch(path, {
      ignored: /.*\.(?!avi$|mkv$|mp4$)[^.]+$/,
      ignoreInitial: true
    })

    this.watcher
      .on('ready', this.onWatcherReady)
      .on('add', (path) => {
        console.log('[Watcher] File', path, 'has been added')
        const newFile = this.handleNewFile(path)
        this.searchSubtitles(newFile)
      })
      .on('error', this.onError)
  }

  onWatcherReady () {
    console.info('[Watcher] Watcher is ready.')
  }

  onError (error) {
    console.log('[Watcher] Error happened: ', error)
  }

  searchSubtitles (file) {
    subtitlesManager.search(file, userDataManager.get('languages').toString(), (err, data) => {
      !err ? console.log(`Downloaded subtitle for file ${data.name}. Language: ${data.lang}`)
        : console.log(`Could not download subtitle for file ${data.name}: `, err)
    })
  }

  handleNewFile (path) {
    return {
      path,
      name: fileManager.getFileName(path)
    }
  }
}

module.exports = DirWatcher
