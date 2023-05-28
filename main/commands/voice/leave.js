import { SlashCommandBuilder } from 'discord.js';

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

        if (interaction.client.currentConnections[channel.guild.id]) {
            interaction.client.currentConnections[channel.guild.id].destroy();
        } else {
            await interaction.reply('The bot is not in a channel');
            return
        }

		await interaction.reply({ content: 'Left!', ephemeral: true});
	},
};