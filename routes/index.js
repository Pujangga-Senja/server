const express = require('express');
const multer = require('multer');
const speech = require('@google-cloud/speech');
const gcsHelpers = require('../helpers/gcsHelpers');
const { storage } = gcsHelpers;
const { uploadFile } = require('../middlewares/gcsUpload')
const DEFAULT_BUCKET_NAME = 'pujangga-senja-image';
const fs = require('fs');
const userRoutes = require('./user');

const router = express.Router();
const upload = multer();

router.use('/users', userRoutes);

router.post('/audio', upload.single('filename'), (req, res, next) => {
  async function main() {
    // Creates a client
    const client = new speech.SpeechClient({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
    });

    // The name of the audio file to transcribe

    // Reads a local audio file and converts it to base64
    const file = req.file.buffer;
    const audioBytes = file.toString('base64');

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes
    };
    const config = {
      encoding: 'FLAC',
      languageCode: 'id-ID'
    };
    const request = {
      audio: audio,
      config: config
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
    res.status(200).json(transcription);
  }
  main().catch(console.error);
<<<<<<< HEAD
})

router.post('/upload',uploadFile.single('filename'), function (req,res,next) {
  console.log(req.body)
})

module.exports = router
=======
});

module.exports = router;
>>>>>>> user register & login selesai
