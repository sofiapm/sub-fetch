/**
 * Module dependencies.
 */

const config = require('config');
const electron = require('electron');

const {app,BrowserWindow} = electron;

const menu = require('../src/menu/menu-manager');

function createWindow () {
    const win = new BrowserWindow({ minWidth: 500, maxWidth: 500, width: 500, height: 400 });
    
    win.loadURL(config.get('templates.main_window.dir'));

    win.webContents.openDevTools();

    win.webContents.on('will-navigate', function (event, url) {
        event.preventDefault();
    });

    menu.setMenu();
}

/**
 * App init.
 */

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
