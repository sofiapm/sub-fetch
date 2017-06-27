/**
 * Module dependencies.
 */

const config = require('config')
const { BrowserWindow } = require('electron')

/**
 * Export `Menu Template`.
 */

class MenuTemplate {

  template () {
    const template = []
    template.push(this.editTemplate())
    template.push(this.helpTemplate())

    return template
  }

  editTemplate () {
    const self = this

    return {
      label: 'SubFetch',
      submenu: [
        {
          label: 'Settings',
          role: 'settings',
          click (menuItem, browserWindow, event) {
            self.createSettingsWindow()
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          role: 'quit'
        }
      ]
    }
  }

  helpTemplate () {
    return {
      label: 'About',
      role: 'about',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://github.com/sofiapm/sub-fetch') }
        }
      ]
    }
  }

  createSettingsWindow () {
    const settingsWindow = new BrowserWindow({ minWidth: 100, maxWidth: 400, width: 400, height: 400, show: true })
    settingsWindow.loadURL(config.get('templates.settings_window.dir'))
    settingsWindow.webContents.openDevTools()
    return settingsWindow
  }
}

module.exports = new MenuTemplate()
