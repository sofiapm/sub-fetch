const path = require('path')
const DirectoryWatcher = require(path.resolve('src/watcher/directory-watcher'))
const UserDataManager = require(path.resolve('src/user-data/user-data-manager'))
const userDataManager = new UserDataManager()

class WatcherManager {

  constructor () {
    this.startWatcher()
  }

  startWatcher () {
    const paths = this.getPaths()
    this.watcher = new DirectoryWatcher(paths)
  }

  watch (paths) {
    this.watcher.watch(paths)
  }

  unWatch (paths) {
    this.watcher.unWatch(paths)
  }

  getPaths () {
    return userDataManager.get('directories')
  }
}

module.exports = new WatcherManager()
