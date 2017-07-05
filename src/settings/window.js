const config = require('config')
const { BrowserWindow } = require('electron')

class Window {
  create () {
    const settingsWindow = new BrowserWindow({ minWidth: 100, maxWidth: 400, width: 400, height: 600, show: true })
    settingsWindow.loadURL(config.get('templates.settings_window.dir'))

    return settingsWindow
  }
}

module.exports = new Window()
