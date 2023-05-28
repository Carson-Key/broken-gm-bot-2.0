import { SlashCommandBuilder } from 'discord.js';
import { QueryType } from 'discord-player';
import customVoice from '../../../helpers/voices/custom.js';

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

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        await interaction.deferReply({ ephemeral: true });

        const fileName = await customVoice(voiceId, text, stability, similarity)

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