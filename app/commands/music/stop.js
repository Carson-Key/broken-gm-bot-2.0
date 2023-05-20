const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop the queue'),
	async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild.id)

        if (!queue) {
            await interaction.reply('There is no queue');
        }
        
        queue.delete();
    
        await interaction.reply('The music has stopped');
	},
};