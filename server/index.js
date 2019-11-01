const express = require('express')
const app = express()
const fs = require('fs')
const ytdl = require('ytdl-core')
const ffmpeg   = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const timeout = require('connect-timeout');


require('dotenv').config()

app.use(timeout('120s'));
app.use(express.static('mp3'))


const { SERVICE_URL } = process.env


ffmpeg.setFfmpegPath(ffmpegPath);


app.get('/', (req, res) => res.send('react native music app service'))

function isExists (req, res, next) {
  fs.exists(`mp3/${req.params.videoId}.mp3`, (exists) => {
    req.mp3File = exists

    next()
  })
}

function downloadMp3({ mp3File, params: { videoId } }, res, next) {
  if ( mp3File ) {
    next()
  }

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
      console.log('error', err)
      res.json(err)
    })
    .on("end", function() {
      next() 
    })
  }) 
}
function renderJson(req, res) {
  res.json({
    audio: `${SERVICE_URL}/${req.params.videoId}.mp3`
  })
}


app.get('/download/:videoId', isExists, downloadMp3, renderJson)


app.listen(process.env.PORT || 3000)