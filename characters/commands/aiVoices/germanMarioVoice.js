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
		.setName('german-mario-voice')
		.setDescription('Has the bot say the text you provided in German Mario\'s voice')
        .addStringOption(option =>
			option
				.setName('text')
				.setRequired(true)
				.setDescription('The text you want Knox to say')),
	async execute(interaction) {
        const text = interaction.options.getString('text', true);
        const fileName = path.join(__dirname, 'mp3s', `german-mario-${uuidv4()}.mp3`)

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        await interaction.deferReply({ ephemeral: true });

        const res = await axios({
			method: 'POST',
			url: `https://api.elevenlabs.io/v1/text-to-speech/j9jnXcYTprJBiRnYU55H/stream`,
			data: {
                "text": `hello I am German Mario, ${text}`,
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

        try {
            const { track } = await interaction.client.player.play(channel, fileName, {
                searchEngine: QueryType.FILE,
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: false,
                    leaveOnEnd: false,
                },
            });

            return interaction.followUp({ content: `**Having German Mario say:** ${text}`, ephemeral: true});
        } catch (e) {
            console.error(`Bad: ${e}`)
            return interaction.followUp({ content: `Something went wrong`, ephemeral: true});
        }
	},
};