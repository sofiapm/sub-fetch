/**
 * Module dependencies.
 */

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
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    }
  }

  helpTemplate () {
    return {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('http://electron.atom.io') }
        }
      ]
    }
  }
}

module.exports = new MenuTemplate()
