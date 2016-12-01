/**
 * Module dependencies.
 */

const config = require('config');
const electron = require('electron');

const {app} = electron;
const {BrowserWindow} = electron;

const menu = require('../src/menu/menu-manager');

/**
 * App init.
 */

app.on('ready', () => {
    
    const win = new BrowserWindow({ width: 800, height: 600, resizable: false });
    
    win.loadURL(config.get('templates.main_window.dir'));

    win.webContents.openDevTools();

    menu.setMenu();
    
});
