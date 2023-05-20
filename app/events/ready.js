const fs = require('node:fs');
const path = require('node:path');
const { Events } = require('discord.js');
const { Player } = require('discord-player');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const player = new Player(client);
		await player.extractors.loadDefault();

		client.player = player;

		const playerEventsPath = path.join(__dirname, 'player');
		const playerEventFiles = fs.readdirSync(playerEventsPath).filter(file => file.endsWith('.js'));

		for (const file of playerEventFiles) {
			const filePath = path.join(playerEventsPath, file);
			const event = require(filePath);
			client.player.events.on(event.name, (...args) => event.execute(...args));
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};