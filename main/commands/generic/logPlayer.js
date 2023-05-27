import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('log-player')
		.setDescription('Logs player info in server console'),
	async execute(interaction) {
		console.log(interaction.client.player)
		await interaction.reply({ content: 'Logged!', ephemeral: true});
	},
};