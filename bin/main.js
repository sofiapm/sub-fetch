const config = require('config');
const electron = require('electron');

const {app} = electron;
const {BrowserWindow} = electron;

app.on('ready', () => {
    console.log(config.get('assets.bar_icon.dir'));
    const win = new BrowserWindow({ width: 800, height: 600, icon: config.get('assets.bar_icon.dir') });
    win.loadURL(config.get('templates.main_window.dir'));
});
