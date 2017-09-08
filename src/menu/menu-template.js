/**
 * Module dependencies.
 */

const path = require('path')
const settingsWindow = require(path.resolve('src/settings/window'))
const aboutWindow = require(path.resolve('src/about/window'))

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
    return {
      label: 'SubFetch',
      submenu: [
        {
          label: 'Settings',
          role: 'settings',
          click (menuItem, browserWindow, event) {
            settingsWindow.create()
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
          label: 'About Us',
          click () {
            aboutWindow.create()
          }
        },
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://github.com/sofiapm/sub-fetch') }
        }
      ]
    }
  }
}

module.exports = new MenuTemplate()
