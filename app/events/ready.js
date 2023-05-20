const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const player = new Player(client);
		await player.extractors.loadDefault();

		client.player = player;

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};