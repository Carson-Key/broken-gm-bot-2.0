import fs from 'node:fs';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { pipeline } from 'node:stream/promises';
import axios from 'axios';
import appRoot from 'app-root-path';

const germanMarioVoice = async (text) => {
    const fileName = path.join(appRoot.path, 'mp3s', `german-mario-${uuidv4()}.mp3`);

    const res = await axios({
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/j9jnXcYTprJBiRnYU55H/stream`,
        data: {
            "text": `${text}`,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": 0.60,
                "similarity_boost": 0.90
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

export default germanMarioVoice