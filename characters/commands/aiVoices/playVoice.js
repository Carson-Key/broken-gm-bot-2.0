import { SlashCommandBuilder } from 'discord.js';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import { QueryType } from 'discord-player';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	data: new SlashCommandBuilder()
		.setName('play-voice')
		.setDescription('Has the bot say the text you provided in the voice of your choice')
        .addStringOption(option =>
			option
				.setName('voice-id')
				.setRequired(true)
				.setDescription('The ID of the voice you want spoken'))
        .addStringOption(option =>
			option
				.setName('text')
				.setRequired(true)
				.setDescription('The text you want Knox to say'))
        .addNumberOption(option =>
            option
                .setName('stability')
                .setDescription('The stability value'))
        .addNumberOption(option =>
            option
                .setName('similarity')
                .setDescription('The similarity value')),
	async execute(interaction) {
        const text = interaction.options.getString('text', true);
        const voiceId = interaction.options.getString('voice-id', true);
        const stability = interaction.options.getNumber('stability')
        const similarity = interaction.options.getNumber('similarity')
        const fileName = path.join(__dirname, 'mp3s', `custom-voice-${uuidv4()}.mp3`)

        const res = await axios({
			method: 'POST',
			url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
			data: {
                "text": `${text}`,
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {
                    "stability": stability ? stability : 0.75,
                    "similarity_boost": similarity ? similarity : 0.75
                }
            },
			headers: {
				'Accept': 'audio/mpeg',
				'xi-api-key': process.env.ELEVENLABS_KEY,
				'Content-Type': 'application/json',
			},
			responseType: 'stream'
		});
        res.data.pipe(fs.createWriteStream(fileName))
        
        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        await interaction.deferReply();

        try {
            const { track } = await interaction.client.player.play(channel, fileName, {
                searchEngine: QueryType.FILE,
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: false,
                    leaveOnEnd: false,
                },
            });

            return interaction.followUp(`Queue: **${track.title}**`);
        } catch (e) {
            return interaction.followUp(`Something went wrong: ${e}`);
        }

		await interaction.reply({ content: `**Having Knox say:** ${text}`, ephemeral: true});
	},
};