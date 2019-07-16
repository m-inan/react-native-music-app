const express = require('express')
const app = express()

const ytdl = require('ytdl-core')
const ffmpeg   = require('fluent-ffmpeg');

app.use(express.static('mp3'))

app.get('/download/:videoId', async ({ params: { videoId } }, res) => {

  ytdl.getInfo(`http://www.youtube.com/watch?v=${videoId}`, { quality: 'highestaudio' }, function(err, info) {
    var stream = ytdl.downloadFromInfo(info, {
      quality: 'highestaudio'
    })

    ffmpeg(stream)
    .audioBitrate(info.formats[0].audioBitrate)
    .withAudioCodec("libmp3lame")
    .toFormat("mp3")
    .saveToFile(`mp3/${videoId}.mp3`)
    .on("error", function(err) {
      res.json(err)
    })
    .on("end", function() {
      res.json({
        audio: `http://localhost:3000/${videoId}.mp3`
      })
    })
  })
})

app.listen(3000)