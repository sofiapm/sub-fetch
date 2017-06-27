const assert = require('assert')
const config = require('config')
const path = require('path')

const fileManager = require(path.resolve('src/file/file-manager'))
const fs = require('fs')

describe('fileManager', function () {
  describe('#getSubtitlePath', function () {
    it('shoud return same path with `.srt` extension', function () {
      const path = 'The.Affair.S03E05.WEBRip.XviD-FUM[ettv].avi'

      const pathCase = fileManager.getSubtitlePath(path)
      assert.equal(pathCase, 'The.Affair.S03E05.WEBRip.XviD-FUM[ettv].srt')
    })

    it('shoud return same path with `.srt` extension, even if file name have spaces', function () {
      const path = 'Manhunter 1986 720p BRRip x264-MgB.mkv'

      const pathCase = fileManager.getSubtitlePath(path)
      assert.equal(pathCase, 'Manhunter 1986 720p BRRip x264-MgB.srt')
    })
  })

  describe('#hashFile', function () {
    it('shoud return file hash', function () {
      const path = config.get('test.tv_shows.dir') + 'The.Affair.S03E05.WEBRip.XviD-FUM[ettv].avi'

      const hash = fileManager.hashFile(path)
      assert.equal(hash, 'd41d8cd98f00b204e9800998ecf8427e')
    })
  })

  describe('#writeFile', function () {
    it('shoud write file to specified path', function (done) {
      const newFilePath = config.get('test.tv_shows.dir') + 'The.Affair.S03E05.WEBRip.XviD-FUM[ettv]_new_file.srt'
      const oldFilePath = config.get('test.tv_shows.dir') + 'The.Affair.S03E05.WEBRip.XviD-FUM[ettv].avi'

      fs.readFile(oldFilePath, {encoding: 'utf-8'}, function (err, data) {
        if (err) {
          assert.ok(false)
          done(err)
        } else {
          fileManager.writeFile(newFilePath, data, (err, data) => {
            assert.equal(undefined, err)

            done()
          })
        }
      })
    })
  })
})

