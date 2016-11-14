const config = require('config');
const electron = require('electron');

const {app} = electron;
const {BrowserWindow} = electron;

app.on('ready', () => {
    const win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL(config.get('templates.main_window.dir'));
});
