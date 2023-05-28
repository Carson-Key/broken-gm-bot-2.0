import fs from 'node:fs';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { pipeline } from 'node:stream/promises';
import axios from 'axios';
import appRoot from 'app-root-path';

const customVoice = async (voiceId, text, stability, similarity) => {
    const fileName = path.join(appRoot.path, 'mp3s', `custom-${uuidv4()}.mp3`);
    const stabilityValue = stability ? stability : 0.75
    const similarityValue = similarity ? similarity : 0.75

    const res = await axios({
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
        data: {
            "text": `${text}`,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": stabilityValue,
                "similarity_boost": similarityValue
            }
        },
        headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': process.env.ELEVENLABS_KEY,
            'Content-Type': 'application/json',
        },
        responseType: 'stream'
    });
    await pipeline(res.data, fs.createWriteStream(fileName))

    return fileName
}

export default customVoice