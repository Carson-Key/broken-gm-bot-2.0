import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Has the bot join your current channel'),
	async execute(interaction) {
        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        if (interaction.client.currentConnections[channel.guild.id]) {
            await interaction.reply('The bot is already in a channel');
            return
        } else {
            interaction.client.currentConnections[channel.guild.id] = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false
            });
        }

		await interaction.reply({ content: 'Joined!', ephemeral: true});
	},
};