
const subtitlesManager = require('../src/open-subtitles/open-subtitles-manager')

const holder = document.getElementById('holder')
const table = document.getElementById('sub-result')
const check = '&#8730'
const nocheck = '&#9747'

holder.ondragover = ev => {
  ev.preventDefault()
}

holder.ondrop = ev => {
  console.log(ev.dataTransfer.files.length)

  for (let i = 0; i < ev.dataTransfer.files.length; i++) {
    console.log(ev.dataTransfer.files[i].path)

    subtitlesManager.search(ev.dataTransfer.files[i], (err, data) => {
      const row = table.insertRow(0)
      row.insertCell(0).innerHTML = data
      row.insertCell(1).innerHTML = !err ? check : nocheck
    })
  }
  ev.preventDefault()
}
