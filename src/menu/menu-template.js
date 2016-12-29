/**
 * Module dependencies.
 */


/**
 * Export `Menu Template`.
 */

class MenuTemplate {

  template(){
    let template = [];
    template.push(this.editTemplate());
    template.push(this.helpTemplate());
    template.push({ 
      label: "Quit",
      accelerator: "Command+Q",
      click: function() { app.quit(); }
    });

    return template;
  }

  editTemplate(){
    return {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]};
  }

  helpTemplate(){
    return   {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('http://electron.atom.io') }
        }
      ]
    };
  }
}

module.exports = new MenuTemplate();
