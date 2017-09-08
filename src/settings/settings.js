const path = require('path')
const arrayHelper = require(path.resolve('src/helpers/array-helper'))

const MultiSelect = require(path.resolve('src/html-elements/multi-select'))
const optionsCase = require(path.resolve('db/languages_options.json'))

const UserDataManager = require(path.resolve('src/user-data/user-data-manager'))
const userDataManager = new UserDataManager()

const { remote } = require('electron')
const dialog = remote.require('electron').dialog

const watcherManager = require(path.resolve('src/watcher/watcher-manager'))

let multiSelectLanguagesIndexes
if (userDataManager.get('languages-indexes')) {
  multiSelectLanguagesIndexes = userDataManager.get('languages-indexes')
}

const multiSelect = new MultiSelect(multiSelectLanguagesIndexes)
const languagesSelect = document.getElementById('languages-select-label')
languagesSelect.appendChild(multiSelect.getSelect())

const saveButton = document.getElementById('settings-save-button')

// options from languages_options
optionsCase.sort(function (a, b) {
  return a.text.localeCompare(b.text)
})
multiSelect.addOptions(optionsCase)

if (userDataManager.get('directories')) {
  document.getElementById('sub-directory-input').value = userDataManager.get('directories')[0]
}

document.getElementById('sub-directory-btn').addEventListener('click', _ => {
  const path = dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  document.getElementById('sub-directory-input').value = path
})

saveButton.addEventListener('click', () => {
  // save languages value array
  let languagesToSave = arrayHelper.getAtIndexes(optionsCase, multiSelect.selectedIndexes)
  languagesToSave = languagesToSave.map(el => el.value)
  userDataManager.set('languages', languagesToSave)
  userDataManager.set('languages-indexes', multiSelect.selectedIndexes)

  // save directories to watch
  const directoriesToWatch = []
  // unwatch previous saved directories
  watcherManager.unWatch(userDataManager.get('directories'))

  // TODO: enable multi directory saving
  // dif between previous saved directories and new ones, only after that, unwatch and watch

  directoriesToWatch.push(document.getElementById('sub-directory-input').value)
  userDataManager.set('directories', directoriesToWatch)

  // watch new saved directories
  watcherManager.watch(userDataManager.get('directories'))
})
