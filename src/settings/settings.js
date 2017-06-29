const path = require('path')
const MultiSelect = require(path.resolve('src/html-elements/multi-select'))
const multiSelect = new MultiSelect()
const optionsCase = require(path.resolve('db/languages_options.json'))

const { remote } = require('electron')
const dialog = remote.require('electron').dialog

const languagesSelect = document.getElementById('languages-select-label')
languagesSelect.appendChild(multiSelect.getSelect())

// options from languages_options
optionsCase.sort(function (a, b) {
  return a.text.localeCompare(b.text)
})
multiSelect.addOptions(optionsCase)

document.getElementById('sub-directory-btn').addEventListener('click', _ => {
  const path = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  document.getElementById('sub-directory-input').value = path
})
