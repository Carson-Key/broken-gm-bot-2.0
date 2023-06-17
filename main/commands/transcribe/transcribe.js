import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import { EndBehaviorType, VoiceConnectionStatus } from "@discordjs/voice"; 
import fs from 'node:fs';
import path from 'node:path';
import pkg from '@discordjs/opus';
const { OpusEncoder } = pkg;
import WavFileWriter from 'wav'
const wavWriter = WavFileWriter.FileWriter;
import appRoot from 'app-root-path';
import { v4 as uuidv4 } from 'uuid';
import child from 'child_process'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	data: new SlashCommandBuilder()
		.setName('transcribe')
		.setDescription('Start to transcribe'),
	async execute(interaction) {
        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        await interaction.deferReply();

        let connection = getVoiceConnection(interaction.guild.id)

        if (!connection) {
            connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false
            });
        }

        const receiver = connection.receiver;

        receiver.speaking.on('start', (userId) => {
            if (!['938666876131770389'].includes(userId)) {
                const fileName = path.join(appRoot.path, 'mp3s', `${userId}-${uuidv4()}.wav`);

                const wavFileStream = new wavWriter(`${fileName}`, {
                    sampleRate: 48000,
                    bitDepth: 16,
                    channels: 2
                });

                let subscription = receiver.subscribe(userId, { end: { 
                    behavior: EndBehaviorType.AfterSilence, 
                    duration: 100 
                }}); 

                const encoder = new OpusEncoder(48000, 2); 

                subscription.on("data", chunk => { 
                    wavFileStream.write(encoder.decode(chunk)) 
                }); 

                subscription.once("end", async () => { 
                    if (wavFileStream) {
                        wavFileStream.end();
                    }

                    let transcribeScript = child.spawn("node", [
                        path.join(__dirname, '..', '..', '..', 'bin', 'openAiTranscribe.js'),
                        fileName
                    ]);
                    transcribeScript.stderr.on('data', function(data) {
                        console.log(data);
                    });
                    transcribeScript.stdout.on('data', (data) => {
                        const dateObject = new Date();
                        const date = (`0 ${dateObject.getDate()}`).slice(-2);
                        const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
                        const year = dateObject.getFullYear();
                        const hours = dateObject.getHours();
                        const minutes = dateObject.getMinutes();
                        const seconds = dateObject.getSeconds();
                        const log = data.toString();

                        console.log(log)

                        interaction.channel.send(`[${year}-${month}-${date} ${hours}:${minutes}:${seconds}] <@${userId}>: ${log}`)
                    });
                }); 
            }
        });

        return interaction.followUp({ content: `Started Trascribing`});
	},
};