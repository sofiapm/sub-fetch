/**
 * Module dependencies.
 */

const { Menu } = require('electron')

const menuTemplate = require('../menu/menu-template');

/**
 * Export `Menu Manager`.
 */

class MenuManager {

    setMenu(){
        const menu = Menu.buildFromTemplate(menuTemplate.template());
        Menu.setApplicationMenu(menu);
    }
}

module.exports = new MenuManager();