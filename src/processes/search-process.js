const path = require('path')
const subtitlesManager = require(path.resolve('src/open-subtitles/open-subtitles-manager'))

process.on('message', function (message) {
  const file = JSON.parse(message.file)
  const languages = message.languages

  subtitlesManager.search(file, languages, (err, data) => {
    data.err = err
    data.hasFinished = message.hasFinished

    process.send(data)
  })
})
