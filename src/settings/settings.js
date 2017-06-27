const { remote } = require('electron')
const dialog = remote.require('electron').dialog
// const languages = document.getElementById('languages')

document.getElementById('sub-directory-btn').addEventListener('click', _ => {
  const path = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  document.getElementById('sub-directory-input').value = path
})
