const path = require('path')
const DirectoryWatcher = require(path.resolve('src/watcher/directory-watcher'))
const UserDataManager = require(path.resolve('src/user-data/user-data-manager'))
const userDataManager = new UserDataManager()

class WatcherManager {

  startWatcher() {
    const path = this.getPath()
    new DirectoryWatcher(path)
  }

  getPath() {
    return userDataManager.get('directories')[0]
  }
}

module.exports = new WatcherManager()