const path = require('path')
const UserDataManager = require(path.resolve('src/user-data/user-data-manager'))
const userDataManager = new UserDataManager()

const table = document.getElementById('sub-result')
const holder = document.getElementById('holder')
const uploadImg = document.getElementById('upload-img')
const loaderArea = document.getElementById('loader-area')
const { fork } = require('child_process')
const pool = fork(path.resolve('src/processes/search-process.js'))

const check = '&#8730'
const nocheck = '&#9747'

/**
 * Drag Animation Events
 */

holder.ondragenter = ev => {
  expandUploadImg()
  ev.stopPropagation()
  ev.preventDefault()
}

holder.ondragleave = ev => {
  normalizeUploadImg()
  ev.stopPropagation()
  ev.preventDefault()
}

holder.ondragover = ev => {
  ev.stopPropagation()
  ev.preventDefault()
}

function expandUploadImg () {
  uploadImg.style.width = '60px'
}

function normalizeUploadImg () {
  uploadImg.style.width = '50px'
}

/**
 * Drop Event
 */

holder.ondrop = ev => {
  ev.stopPropagation()
  ev.preventDefault()

  normalizeUploadImg()
  showLoading()

  const languages = userDataManager.get('languages').toString()
  const files = ev.dataTransfer.files

  for (let i = 0; i < files.length; i++) {
    const file = fileToString(files[i])
    const hasFinished = isLastElement(i, files).toString()
    pool.send({ file, languages, hasFinished })
  }
}

pool.on('message', function (message) {
  const row = table.insertRow(0)
  row.insertCell(0).innerHTML = message.name
  row.insertCell(1).innerHTML = message.lang || ''
  row.insertCell(2).innerHTML = !message.err ? check : nocheck

  if (message.hasFinished === 'true') {
    hideLoading()
  }
})

function showLoading () {
  loaderArea.style.display = 'flex'
}

function hideLoading () {
  loaderArea.style.display = 'none'
}

function isLastElement (index, array) {
  return index === array.length - 1
}

function fileToString (file) {
  let fileString = '{'
  for (var property in file) {
    if (property) {
      fileString += `"${property}":"${file[property]}", `
    }
  }
  return fileString.slice(0, -2) + '}'
}
