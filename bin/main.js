/**
 * Module dependencies.
 */

const path = require('path')
const config = require('config')
const electron = require('electron')

const { app, BrowserWindow, Menu } = electron

const menuTemplate = require(path.resolve('src/menu/menu-template'))
const watcherManager = require(path.resolve('src/watcher/watcher-manager'))

let win = null
let willQuitApp = false

/**
 * App init.
 */

app.on('ready', () => {
  createMenu()
  createMainWindow()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createMainWindow()
  } else {
    win.show()
  }
})

/* 'before-quit' is emitted when Electron receives
 * the signal to exit and wants to start closing windows */
app.on('before-quit', () => willQuitApp = true)

/**
 * Functions
 */

function createMainWindow () {
  win = new BrowserWindow({ minWidth: 500, maxWidth: 500, width: 500, height: 500, maxHeight: 500 })

  win.loadURL(config.get('templates.main_window.dir'))

  win.webContents.on('will-navigate', function (event, url) {
    event.preventDefault()
  })

  win.on('close', (e) => {
    if (willQuitApp) {
      /* the user tried to quit the app */
      win = null
    } else {
      /* the user only tried to close the window */
      e.preventDefault()
      win.hide()
    }
  })
}

function createMenu () {
  const menu = Menu.buildFromTemplate(menuTemplate.template())
  Menu.setApplicationMenu(menu)
}
