const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

async function quickstart() {
  const filename =
    '/Users/vinicius/Downloads/Record (online-audio-converter.com) (2).flac';
  const encoding = 'FLAC';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };
  const audio = {
    content: fs.readFileSync(filename).toString('base64'),
  };

  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');
  console.log('Transcription: ', transcription);
  console.log(typeof transcription);
}
quickstart();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
