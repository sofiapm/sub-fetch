/**
 * Module dependencies.
 */

const path = require('path')
const config = require('config')
const electron = require('electron')

const { app, BrowserWindow, Menu } = electron

const menuTemplate = require(path.resolve('src/menu/menu-template'))

let win = null

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
  }
})

/**
 * Functions
 */

function createMainWindow () {
  const win = new BrowserWindow({ minWidth: 500, maxWidth: 500, width: 500, height: 500, maxHeight: 500 })

  win.loadURL(config.get('templates.main_window.dir'))

  // win.webContents.openDevTools()

  win.webContents.on('will-navigate', function (event, url) {
    event.preventDefault()
  })
}

function createMenu () {
  const menu = Menu.buildFromTemplate(menuTemplate.template())
  Menu.setApplicationMenu(menu)
}
