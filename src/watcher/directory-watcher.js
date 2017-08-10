const chokidar = require("chokidar");

class DirWatcher {


  constructor(path) {
    this.watcher = chokidar.watch(path, {
      ignored: /.*\.(?!avi$|mkv$|mp4$)[^.]+$/,
      persistent: true,
      ignoreInitial: true
    })

    this.watcher

      .on('ready', this.onWatcherReady)
      .on('add', this.onFileAdd)
      .on('addDir', this.onDirAdd)
      .on('change', this.onFileChange)
      .on('error', this.onError)
  }

  onWatcherReady() {
    console.info('[Watcher] Watcher is ready.');
  }

  onError(error) {
    console.log('[Watcher] Error happened: ', error);
  }

  onFileAdd(path) {
    console.log('[Watcher] File', path, 'has been added');
  }

  onDirAdd(path) {
    console.log('[Watcher] Directory', path, 'has been added');
  }

  onFileChange(path) {
    console.log('[Watcher] File', path, 'has been changed');
  }
}

module.exports = DirWatcher