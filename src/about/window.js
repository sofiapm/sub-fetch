const config = require('config')
const { BrowserWindow } = require('electron')

class Window {
  create() {
    const aboutWindow = new BrowserWindow({ minWidth: 400, maxWidth: 400, width: 400, height: 400, maxHeight: 400, show: true })
    aboutWindow.loadURL(config.get('templates.about_window.dir'))

    return aboutWindow
  }
}

module.exports = new Window()
