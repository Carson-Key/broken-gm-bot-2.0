import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Has the bot leave its current channel'),
	async execute(interaction) {
        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        const connection = getVoiceConnection(interaction.guild.id)

        if (connection) {
            connection.destroy();
        } else {
            await interaction.reply('The bot is not in a channel');
            return
        }

		await interaction.reply({ content: 'Left!', ephemeral: true});
	},
};