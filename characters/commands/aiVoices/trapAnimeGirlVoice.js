import { SlashCommandBuilder } from 'discord.js';
import { QueryType } from 'discord-player';
import trapAnimeGirlVoice from '../../../helpers/voices/trapAnimeGirl.js';

export default {
	data: new SlashCommandBuilder()
		.setName('trap-anime-girl-voice')
		.setDescription('Has the bot say the text you provided in a trap anime girls\'s voice')
        .addStringOption(option =>
			option
				.setName('text')
				.setRequired(true)
				.setDescription('The text you want the trap anime girl to say')),
	async execute(interaction) {
        const text = interaction.options.getString('text', true);

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply('You are not in a voice channel');
            return
        }

        await interaction.deferReply({ ephemeral: true });

        const fileName = await trapAnimeGirlVoice(text)

        try {
            const { track } = await interaction.client.player.play(channel, fileName, {
                searchEngine: QueryType.FILE,
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: false,
                    leaveOnEnd: false,
                },
            });

            return interaction.followUp({ content: `**Having Trap Anime Girl say:** ${text}`, ephemeral: true});
        } catch (e) {
            console.error(`Bad: ${e}`)
            return interaction.followUp({ content: `Something went wrong`, ephemeral: true});
        }
	},
};