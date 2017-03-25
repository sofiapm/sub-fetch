
const subtitlesManager = require('../src/open-subtitles/open-subtitles-manager')

const holder = document.getElementById('holder')
const text = document.getElementById('text')

holder.ondragover = ev => {
  ev.preventDefault()
}

holder.ondrop = ev => {
  console.log(ev.dataTransfer.files.length)

  for (let i = 0; i < ev.dataTransfer.files.length; i++) {
    console.log(ev.dataTransfer.files[i].path)

    subtitlesManager.search(ev.dataTransfer.files[i], (err, data) => {
      if (!err) {
        text.textContent += data + ' \n '
      }
    })
  }
  ev.preventDefault()
}
