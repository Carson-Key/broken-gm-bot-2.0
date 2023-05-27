import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('log-client')
		.setDescription('Logs interaction info for in server console'),
	async execute(interaction) {
		console.log(interaction)
		await interaction.reply({ content: 'Logged!', ephemeral: true});
	},
};