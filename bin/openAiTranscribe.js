import { Configuration, OpenAIApi } from "openai";
import fs from 'node:fs';
import dotenv from 'dotenv'

dotenv.config();

const main = async () => {
    const configuration = new Configuration({
        organization: process.env.CHAT_GPT_ORG_ID,
        apiKey: process.env.CHAT_GPT_SECRET_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const fileName = process.argv[2]

    const transcript = await openai.createTranscription(
        fs.createReadStream(fileName),
        "whisper-1",
        "",
        "json",
        0.8
    );

    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })

    if (transcript.data.text && transcript.data.text !== "" && transcript.data.text !== '.') {
        console.log(transcript.data.text)
    }
}

main()