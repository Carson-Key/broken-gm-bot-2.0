import { SlashCommandBuilder } from 'discord.js';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import { QueryType } from 'discord-player';
import { v4 as uuidv4 } from 'uuid';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	data: new SlashCommandBuilder()
		.setName('anime-girl-voice-prompt')
		.setDescription('Has the bot say chat gpt 3.5 turbo\'s response to your prompt in the voice of Anime Girl')
        .addStringOption(option =>
			option
				.setName('prompt')
				.setRequired(true)
				.setDescription('The prompt you want to put through chat gpt 3.5 turbo')),
	async execute(interaction) {
        const prompt = interaction.options.getString('prompt', true);
        const fileName = path.join(__dirname, 'mp3s', `anime-girl-prompt-${uuidv4()}.mp3`)

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        await interaction.deferReply({ ephemeral: true });

        let message = "Something Went Wrong"

        try {
            const completion = await interaction.client.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: `${prompt}, in 2500 characters or less`}],
            });

            message = completion.data.choices[0].message.content
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
            return interaction.followUp({ content: `Something went wrong`});
        }

        const res = await axios({
            method: 'POST',
            url: `https://api.elevenlabs.io/v1/text-to-speech/FlO6X7dwvuIXITz4AqFf/stream`,
            data: {
                "text": `${message}`,
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {
                    "stability": 0.60,
                    "similarity_boost": 0.80
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

        try {
            const { track } = await interaction.client.player.play(channel, fileName, {
                searchEngine: QueryType.FILE,
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: false,
                    leaveOnEnd: false,
                },
            });

            return interaction.followUp({ content: `**Having Voice ${voiceId} say:** ${text}`, ephemeral: true});
        } catch (e) {
            console.error(`Bad: ${e}`)
            return interaction.followUp({ content: `Something went wrong`, ephemeral: true});
        }
	},
};